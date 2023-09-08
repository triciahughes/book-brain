import React from "react";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div className='flex justify-evenly items-center mx-10 mb-5 mt-10'>
        {/* image here? */}
        Home Page - Dashboard / Feed
      </div>
    </div>
  );
};

export default Dashboard;
