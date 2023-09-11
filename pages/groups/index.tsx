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

const renderGroupCards = (groups?: Group[]) => {
  if (!groups || groups.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center'>
        <div className='text-red-400 italic'>
          Looks like you don't have any groups.
        </div>
        <button className='p-3 mt-4 rounded-lg border border-white text-blue-300 hover:text-purple-700 hover:bg-gray-400'>
          Add Group
        </button>
      </div>
    );
  }

  return groups.map(({ id, name }) => <GroupCard groupName={name} key={id} />);
};

const Groups: React.FC<GroupsProps> = ({
  userHostGroups,
  userMemberGroups,
}) => {
  return (
    <div>
      <div className='flex justify-evenly items-center mb-5 mt-10 text-2xl font-bold'>
        <div>Groups you host:</div>
        <div>Groups you are in:</div>
      </div>
      <div className='flex justify-evenly items-start mx-10 mb-10'>
        {" "}
        <div className='flex flex-col items-center min-h-[300px]'>
          {" "}
          {renderGroupCards(userHostGroups)}
        </div>
        <div className='flex flex-col items-center min-h-[300px]'>
          {" "}
          {renderGroupCards(userMemberGroups)}
        </div>
      </div>
    </div>
  );
};

export default Groups;
