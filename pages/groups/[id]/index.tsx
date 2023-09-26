import React, { useEffect, useState } from "react";
import { fetchGroupById } from "@/app/lib/data-fetching/groupData";
import FeaturedBookPanel from "@/components/featuredBookPanel";
import Image from "next/image";
import CommentCard from "../../../components/commentCard";

export const getServerSideProps = fetchGroupById;

const GroupById = ({ group, members, books, prompts, comments }) => {
  const [gpt, setGpt] = useState(null);
  const [mouseOverImg, setMouseOverImg] = useState(false);
  const [imgClicked, setImgClicked] = useState(false);

  const membersArray = members.map((data: any) => (
    <div key={data.id} className='mb-2 hover:text-gray-600 hover:font-bold'>
      {data.firstName}
    </div>
  ));

  const promptsArray = prompts.map((data: any) => (
    <div key={data.id} className='ml-9 mb-2'>
      {data.promptStr}
    </div>
  ));

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
    data.then((res) => setGpt(res.completion.replace("", "")));
  };

  return (
    <div>
      <div className='flex justify-center items-center p-10 mb-10 bg-gray-900 w-4/5 mx-auto'>
        <div className='text-2xl'>Welcome to {group.name}!</div>
      </div>
      <div className='flex flex-row'>
        <div>
          <div className='border border-gray-600 rounded w-32 p-5 mx-20 mr-10'>
            <div className='flex justify-center items-center mb-5 font-bold'>
              Members:
            </div>

            <div className='flex flex-col '>{membersArray}</div>
            <button
              className='flex justify-center items-center border border-gray-500 rounded p-2 mt-2 bg-green-400 text-black hover:bg-green-800 hover:text-white'
              onClick={fetchGPT}
            >
              Generate Prompt
            </button>
          </div>
        </div>
        <div className='flex flex-col w-full max-w-full'>
          <div className=''>
            <div className='flex-nowrap text-xl text-white mb-5'>
              Current discussion:
            </div>
            <div>{promptsArray}</div>

            <br className='divided-y divide-white-400' />
          </div>
          <div className='flex justify-center'>Comments:</div>
          <div className='flex flex-col mt-5 w-full'>
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
          </div>
        </div>

        <FeaturedBookPanel books={books} />
      </div>
    </div>
  );
};

export default GroupById;
