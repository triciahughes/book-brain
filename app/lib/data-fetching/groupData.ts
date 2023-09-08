import prisma from "../prisma";
import { getSession } from "next-auth/react";

export const fetchUserGroups = async (context) => {
  const session = await getSession(context);

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
