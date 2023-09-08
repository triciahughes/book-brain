import React from "react";
import GroupCard from "../../components/groupCard";
import prisma from "../../app/lib/prisma";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  // Redirect if no session
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  try {
    const userHostGroups = await prisma.group.findMany({
      where: {
        hostId: session.user.id,
      },
    });

    const userMemberGroupsIds = await prisma.member.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        groupId: true,
      },
    });

    const userMemberGroups = await prisma.group.findMany({
      where: {
        id: {
          in: userMemberGroupsIds.map((member) => member.groupId),
        },
      },
    });
    return {
      props: {
        userHostGroups,
        userMemberGroups,
      },
    };
  } catch (error) {
    console.error("Error fetching groups:", error);
    return {
      props: {
        userHostGroups: [],
        userMemberGroups: [],
      },
    };
  }
};

const Groups = ({ userHostGroups, userMemberGroups }) => {
  const groupHostData = userHostGroups?.map((group) => {
    return <GroupCard groupName={group.name} key={group.id} />;
  });

  const groupMemberData = userMemberGroups?.map((group) => {
    return <GroupCard groupName={group.name} key={group.id} />;
  });
  return (
    <div>
      <div className='flex justify-evenly items-center mx-10 mb-5 mt-10'>
        <div>Groups you host:</div>
        <div>Groups you are in:</div>
      </div>
      <div className='flex justify-evenly items-center mx-10 mb-10'>
        {/* cards here */}
        <div>{groupHostData}</div>
        <div>{groupMemberData}</div>
      </div>
    </div>
  );
};

export default Groups;
