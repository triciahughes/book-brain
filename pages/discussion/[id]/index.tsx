import React from "react";
import { fetchDiscussionById } from "@/app/lib/data-fetching/discussionData";
import FeaturedBookPanel from "@/components/featuredBookPanel";
import CommentCard from "@/components/commentCard";
import Image from "next/image";
import LeftArrow from "../../../public/left-arrow.png";

export const getServerSideProps = fetchDiscussionById;

const DiscussionById = ({ books, members, discussion, comments }) => {
  const membersArray = members.map((data: any) => (
    <div key={data.id} className='mb-2 hover:text-gray-600 hover:font-bold'>
      {data.firstName}
    </div>
  ));

  const commentsArr = comments.map((data: any) => (
    <CommentCard key={data.id} commentData={data} />
  ));

  const handleBackClick = () => {
    console.log("go back to groups / discussions page");
  };

  return (
    <div>
      <div className='flex flex-row'>
        <FeaturedBookPanel books={books} membersArray={membersArray} />
        <div className='flex flex-col w-full max-w-10/12'>
          <div className=''>
            <div className='flex flex-row'>
              <div className='px-2 py-2' onClick={handleBackClick}>
                <Image
                  src={LeftArrow}
                  width={24}
                  height={24}
                  alt='arrow'
                  className='hover:scale-125'
                />
              </div>
              <div className='flex flex-row space-x-96 mb-4'>
                <div className='flex-nowrap text-3xl font-bold text-white mr-8'>
                  Discussion Subject here...
                </div>
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

          <div className='flex flex-col mt-5 w-8/12'>{commentsArr}</div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionById;
