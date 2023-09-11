import React from "react";

const GroupCard = ({ groupName }) => {
  return (
    <div className='p-2 px-4 mb-2 rounded-xl border border-purple-500'>
      <div>{groupName}</div>
      <p className='text-xs'>Total members: </p>
    </div>
  );
};

export default GroupCard;
