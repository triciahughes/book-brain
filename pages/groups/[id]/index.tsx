import React, { useEffect, useState } from "react";
import { fetchGroupById } from "@/app/lib/data-fetching/groupData";
import Image from "next/image";
import CommentCard from "../../../components/commentCard";

export const getServerSideProps = fetchGroupById;

const GroupById = ({ group, members, books, prompts, comments }) => {
  const [gpt, setGpt] = useState(null);
  const [mouseOverImg, setMouseOverImg] = useState(false);
  const [imgClicked, setImgClicked] = useState(false);
  //   console.log(group);
  //   console.log(members);
  //   console.log(books);
  //   console.log(prompts);
  //   console.log(comments);

  //   useEffect(() => {
  //     fetchGPT();
  //   }, []);

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

  const handleImgMouseOver = (e: any) => {
    e.preventDefault();
    setMouseOverImg(true);
    // console.log(mouseOverImg);
  };

  const handleImgMouseLeave = (e: any) => {
    e.preventDefault();
    setMouseOverImg(false);
    // console.log(mouseOverImg);
  };

  const handleImgText = () => {
    return mouseOverImg ? "Click for more info" : null;
  };

  const handleMoreInfoClick = () => {
    // console.log(imgClicked);
    setImgClicked((current) => !current);
    // console.log(imgClicked);
  };

  const booksArray = books.map((data: any) =>
    imgClicked ? (
      <div
        key={data.id}
        className='relative ml-9 mb-2'
        style={{ width: 150, height: 150 }}
      >
        {" "}
        <Image
          src={data.image}
          width={150}
          height={150}
          alt='book cover'
          className='rounded-md border-2 hover:contrast-50 hover:opacity-50 hover:blur-sm'
          onMouseOver={handleImgMouseOver}
          onMouseLeave={handleImgMouseLeave}
          onClick={handleMoreInfoClick}
        />
        {mouseOverImg && (
          <div
            className='absolute left-0 bottom-5 top-4 text-white text-left font-bold text-sm p-3'
            onClick={handleMoreInfoClick}
          >
            <div className='font-bold'>Genre:</div>
            <div className='italic text-gray-400'>{data.genre}</div>
            <div className='font-bold'>Author:</div>
            <div className='italic text-gray-400'>{data.author}</div>
            <div className='font-bold'>Date of Publication:</div>
            <div className='italic text-gray-400'>{data.publicationYear}</div>
          </div>
        )}
      </div>
    ) : (
      <div
        key={data.id}
        className='relative ml-9 mb-2'
        style={{ width: 150, height: 150 }}
      >
        <Image
          src={data.image}
          width={150}
          height={150}
          alt='book cover'
          className='rounded-md border-2 hover:contrast-50 hover:opacity-50 hover:blur-sm'
          onMouseOver={handleImgMouseOver}
          onMouseLeave={handleImgMouseLeave}
          onClick={handleMoreInfoClick}
        />
        {mouseOverImg && (
          <div
            className='absolute left-0 bottom-5 text-white text-center font-bold text-sm p-2'
            onClick={handleMoreInfoClick}
          >
            {handleImgText()}
          </div>
        )}
        <div className='mt-2'>{data.title}</div>
      </div>
    )
  );

  //   const booksArray = books.map((data: any) => (
  //     <div key={data.id} className='ml-9 mb-2'>
  //       {/* <div>{data.author}</div> */}
  //       <Image
  //         src={data.image}
  //         width={150}
  //         height={150}
  //         alt='book cover'
  //         className='rounded-md border-2 hover:contrast-50'
  //         onMouseOver={handleImgMouseOver}
  //         onMouseLeave={handleImgMouseLeave}
  //       />
  //       {mouseOverImg && (
  //         <div className='absolute top-0 left-0 text-white text-sm'>
  //           {handleImgText()}
  //         </div>
  //       )}
  //       <div className='mt-2'>{data.title}</div>
  //       {/* <div>{data.genre}</div>
  //       <div>{data.publicationYear}</div> */}
  //     </div>
  //   ));

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

  //   console.log("PROMPT: ", gpt);

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
        <div className='flex flex-col w-1/2 max-w-2xl'>
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
        <div className='ml-20'>
          <div className='ml-9 mb-2'>Current Book:</div>
          {booksArray}
          {/* <div>Current Book:</div>
          <div>Book title here</div>
          <div>Author here</div>
          <div>Book cover here</div>
          <div>Genre</div>
          <div>publication date</div> */}
        </div>
      </div>
    </div>
  );
};

export default GroupById;
