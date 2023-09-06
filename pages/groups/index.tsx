import React from "react";
import GroupCard from "../../components/groupCard";
import prisma from "../../app/lib/prisma";
import { group } from "console";

export const getStaticProps = async () => {
  try {
    const allGroups = await prisma.group.findMany();
    return {
      props: {
        allGroups,
      },
    };
  } catch (error) {
    console.error("Error fetching groups:", error);
    return {
      props: {
        allGroups: [],
      },
    };
  }
};

const Groups = ({ allGroups }) => {
  console.log(allGroups);

  const groupData = allGroups.map((group) => {
    return <GroupCard groupName={group.name} key={group.id} />;
  });
  return (
    <div>
      <div className='flex justify-evenly items-center mx-10 mb-5 mt-10'>
        {/* image here? */}
        <div>Groups you host:</div>
        <div>Groups you are in:</div>
      </div>
      <div className='flex justify-evenly items-center mx-10 mb-10'>
        {/* cards here */}
        <div>{groupData}</div>
        <div>{groupData}</div>
      </div>
    </div>
  );
};

export default Groups;
