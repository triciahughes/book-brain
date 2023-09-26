import React from "react";
import { useRouter } from "next/router";

const GroupCard = ({ groupName, groupId }) => {
  const router = useRouter();

  console.log(typeof groupId);

  const handleGroupCardClick = () => {
    router.push(`/groups/${groupId}`);
  };
  return (
    <div
      className='p-2 px-4 mb-2 rounded-xl border border-purple-500 hover:bg-gray-900 hover:cursor-pointer'
      onClick={handleGroupCardClick}
    >
      <div>{groupName}</div>
      <p className='text-xs'>Total members: </p>
    </div>
  );
};

export default GroupCard;
