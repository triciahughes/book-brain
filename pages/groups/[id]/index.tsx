import React from "react";
import { fetchGroupById } from "@/app/lib/data-fetching/groupData";

export const getServerSideProps = fetchGroupById;

const GroupById = ({ group, members, books, prompts, comments }) => {
  //   console.log(group);
  //   console.log(members);
  console.log(books);
  console.log(prompts);
  console.log(comments);

  const membersArray = members.map((data: any) => (
    <div className='mb-2 hover:text-gray-600 hover:font-bold'>
      {data.firstName}
    </div>
  ));

  const promptsArray = prompts.map((data: any) => (
    <div className='ml-9 mb-2'>{data.promptStr}</div>
  ));
  return (
    <div>
      <div className='flex justify-center items-center p-10 mb-10 bg-gray-900 w-4/5 mx-auto'>
        <div className='text-2xl'>Welcome to {group.name}!</div>
      </div>
      <div className='flex flex-row'>
        <div className='border border-gray-600 rounded w-32 p-5 mx-20 mr-10'>
          <div className='flex justify-center items-center mb-5 font-bold'>
            Members:
          </div>

          <div className='flex flex-col '>{membersArray}</div>
        </div>
        <div className='flex flex-col w-1/2 max-w-2xl'>
          <div className='flex-nowrap text-xl text-white mb-5'>
            Current discussion:
          </div>
          <div>{promptsArray}</div>

          <br className='divided-y divide-white-400' />
          <div className='flex justify-center'>Comments:</div>
        </div>
      </div>
    </div>
  );
};

export default GroupById;
