import React from "react";
import GroupCard from "../../components/groupCard";

const Groups = () => {
  return (
    <div>
      <div className='flex justify-evenly items-center mx-10 mb-5 mt-10'>
        {/* image here? */}
        <div>Groups you host:</div>
        <div>Groups you are in:</div>
      </div>
      <div className='flex justify-evenly items-center mx-10 mb-10'>
        {/* cards here */}
        <div>
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
        </div>
        <div>
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
        </div>
      </div>
    </div>
  );
};

export default Groups;
