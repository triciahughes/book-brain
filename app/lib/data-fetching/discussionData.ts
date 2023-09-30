import prisma from "../prisma";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export const fetchDiscussionById = async (
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

  const discussionId = context.params?.id;

  if (!discussionId) {
    console.error("No discussion id found.");
    // console.log("Discussion id:", discussionId);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const discussion = await prisma.prompt.findUnique({
      where: {
        id: parseInt(discussionId),
      },
    });

    const comments = await prisma.comment.findMany({
      where: {
        promptId: parseInt(discussionId),
      },
    });

    const books = await prisma.book.findUnique({
      where: {
        id: discussion.bookId,
      },
    });

    const membersList = await prisma.member.findMany({
      where: {
        groupId: books.groupId,
      },
    });

    const members = await prisma.user.findMany({
      where: {
        id: {
          in: membersList.map((member) => member.userId),
        },
      },
    });

    return {
      props: {
        discussion,
        comments,
        books,
        members,
      },
    };
  } catch (error) {
    console.error("Error fetching discussion:", error);
    return {
      props: {
        discussion: {},
        comments: [],
        books: {},
        members: {},
      },
    };
  }
};
