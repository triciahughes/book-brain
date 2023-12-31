import Dashboard from "./dashboard/index";
import Head from "next/head";
import { checkUserSession } from "../app/lib/data-fetching/sessionData";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const getServerSideProps = checkUserSession;

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/signin");
    }
  }, [session, router]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
      </Head>

      <Dashboard />
    </>
  );
}
