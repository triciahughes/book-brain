import React from "react";
import GroupCard from "../../components/groupCard";
import { fetchUserGroups } from "../../app/lib/data-fetching/groupData";

interface Group {
  id: number;
  name: string;
}

interface GroupsProps {
  userHostGroups?: Group[];
  userMemberGroups?: Group[];
}

export const getServerSideProps = fetchUserGroups;

const Groups: React.FC<GroupsProps> = ({
  userHostGroups,
  userMemberGroups,
}) => {
  console.log(typeof userHostGroups, typeof userMemberGroups);
  const groupHostData = userHostGroups?.map((group) => {
    return <GroupCard groupName={group.name} key={group.id} />;
  });

  const groupMemberData = userMemberGroups?.map((group) => {
    return <GroupCard groupName={group.name} key={group.id} />;
  });
  return (
    <div>
      <div className='flex justify-evenly items-center mx-10 mb-5 mt-10'>
        <div>Groups you host:</div>
        <div>Groups you are in:</div>
      </div>
      <div className='flex justify-evenly items-center mx-10 mb-10'>
        {/* cards here */}
        <div>{groupHostData}</div>
        <div>{groupMemberData}</div>
      </div>
    </div>
  );
};

export default Groups;
