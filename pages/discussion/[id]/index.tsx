import React, { useEffect, useState } from "react";
import { fetchDiscussionById } from "@/app/lib/data-fetching/discussionData";
import { fetchGroupById } from "@/app/lib/data-fetching/groupData";
import FeaturedBookPanel from "@/components/featuredBookPanel";
import CommentCard from "@/components/commentCard";

export const getServerSideProps = fetchDiscussionById;

const DiscussionById = ({ books, members, discussion, comments }) => {
  const membersArray = members.map((data: any) => (
    <div key={data.id} className='mb-2 hover:text-gray-600 hover:font-bold'>
      {data.firstName}
    </div>
  ));

  return (
    <div>
      <div className='flex flex-row'>
        <FeaturedBookPanel books={books} membersArray={membersArray} />
        <div className='flex flex-col w-full max-w-10/12'>
          <div className=''>
            <div className='flex flex-row space-x-96 mb-4'>
              <div className='flex-nowrap text-3xl font-bold text-white mr-8'>
                Discussion Subject here...
              </div>
            </div>
            <div className='bg-zinc-900 w-8/12 h-auto rounded-2xl mb-4'>
              <div className='p-4'>
                <div className='relative p-4 flex flex-col bg-zinc-800 w-full h-auto rounded-2xl'>
                  <div className='bg-zinc-800 w-auto h-52 rounded-2xl text-zinc-100 mb-2'>
                    {discussion.promptStr}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col mt-5 w-8/12'>
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionById;
