import React from "react";
import FeedCard from "@/components/feedCard";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  // console.log(session?.user.firstName);

  return (
    <div>
      <div className='flex justify-evenly items-center mx-10 mb-8 mt-10 text-2xl'>
        {/* image here? */}
        Welcome, {session?.user.firstName}!
      </div>
      <div className='flex flex-col items-center'>
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>
    </div>
  );
};

export default Dashboard;
