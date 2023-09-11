import React from "react";
import { useRouter } from "next/router";

const GroupCard = ({ groupName, groupId }) => {
  const router = useRouter();

  const handleGroupCardClick = () => {
    router.push(`/groups/${groupId}`);
  };
  return (
    <div
      className='p-2 px-4 mb-2 rounded-xl border border-purple-500'
      onClick={handleGroupCardClick}
    >
      <div>{groupName}</div>
      <p className='text-xs'>Total members: </p>
    </div>
  );
};

export default GroupCard;
