import React, { useEffect, useState } from "react";
import { fetchGroupById } from "@/app/lib/data-fetching/groupData";
import FeaturedBookPanel from "@/components/featuredBookPanel";
import DiscussionCard from "@/components/discussionCard";

export const getServerSideProps = fetchGroupById;

const GroupById = ({ group, members, books, prompts, comments }) => {
  const [gpt, setGpt] = useState(null);

  const membersArray = members.map((data: any) => (
    <div key={data.id} className='mb-2 hover:text-gray-600 hover:font-bold'>
      {data.firstName}
    </div>
  ));

  const promptsArray = prompts.map((data: any) => (
    <div key={data.id} className='mb-2 w-10/12'>
      {data.promptStr}
    </div>
  ));

  const handleTextValue = () => {
    return gpt ? gpt : "";
  };

  const fearturedBook = books.map((data: any) =>
    data.featured === true ? data.title : null
  );

  const featuredAuthor = books.map((data: any) =>
    data.featured === true ? data.author : null
  );

  const fetchGPT = async () => {
    const res = await fetch(`http://localhost:3000/api/openai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Create a discussion prompt about the book '${fearturedBook[0]}' by ${featuredAuthor[0]}`,
      }),
    });
    const data = res.json();
    data.then((res) => setGpt(res.completion.trim().replace("", "")));
  };
  console.log(gpt);

  return (
    <div>
      <div className='flex flex-row'>
        <FeaturedBookPanel books={books} membersArray={membersArray} />
        <div className='flex flex-col w-full max-w-10/12'>
          <div className=''>
            <div className='flex flex-row space-x-96 mb-4'>
              <div className='flex-nowrap text-3xl font-bold text-white mr-8'>
                Discussion
              </div>
              <button
                className='text-zinc-200 font-semibold w-48 p-2 bg-purple-600 rounded-full hover:bg-purple-800'
                onClick={fetchGPT}
              >
                Generate Prompt
              </button>
            </div>
            <div className='bg-zinc-900 w-8/12 h-80 rounded-2xl mb-4'>
              <div className='p-4'>
                <div className='relative p-4 flex flex-col bg-zinc-800 w-full h-72 rounded-2xl'>
                  <textarea
                    className='bg-zinc-800 w-auto h-52 rounded-2xl text-zinc-100 mb-2 resize-none border border-zinc-800 focus:outline-none focus:ring-0 focus:border-transparent'
                    placeholder='Start a discussion...'
                    value={`${handleTextValue()}`}
                  ></textarea>
                  <button className='absolute bottom-4 right-4 w-24 p-2 bg-sky-600 rounded-full hover:bg-sky-800 text-zinc-200 font-semibold'>
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col mt-5 w-8/12'>
            <DiscussionCard books={books} />

            {/* <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupById;
