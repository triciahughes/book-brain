import { getSession } from "next-auth/react";

export const checkUserSession = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // pass the session here if needed
  };
};
