import prisma from "../prisma";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

interface GroupsProps {
  userHostGroups: Array<object>;
  userMemberGroups: Array<object>;
}

export const fetchUserGroups = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<GroupsProps>> => {
  const session = await getSession(context);

  if (!session) {
    console.error("No session found.");
    console.log("Session:", session);
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

export const fetchGroupById = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<object>> => {
  const session = await getSession(context);

  if (!session) {
    console.error("No session found.");
    console.log("Session:", session);
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const groupId = context.params?.id;

  if (!groupId) {
    console.error("No group id found.");
    console.log("Group id:", groupId);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const group = await prisma.group.findUnique({
      where: {
        id: parseInt(groupId),
      },
    });

    const membersList = await prisma.member.findMany({
      where: {
        groupId: parseInt(groupId),
      },
    });

    const members = await prisma.user.findMany({
      where: {
        id: {
          in: membersList.map((member) => member.userId),
        },
      },
    });

    const books = await prisma.book.findMany({
      where: {
        groupId: parseInt(groupId),
      },
    });

    const prompts = await prisma.prompt.findMany({
      where: {
        bookId: {
          in: books.map((book) => book.groupId),
        },
      },
    });

    const comments = await prisma.comment.findMany({
      where: {
        promptId: {
          in: prompts.map((prompt) => prompt.id),
        },
      },
    });

    return {
      props: {
        group,
        members,
        books,
        prompts,
        comments,
      },
    };
  } catch (error) {
    console.error("Error fetching group:", error);
    return {
      props: {
        group: {},
      },
    };
  }
};
