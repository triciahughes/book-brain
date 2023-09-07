import React from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const settings = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/signin");
    }
  }, [session, router]);
  return (
    <div className='flex justify-evenly items-center mx-10 mb-5 mt-10'>
      settings
    </div>
  );
};

export default settings;
