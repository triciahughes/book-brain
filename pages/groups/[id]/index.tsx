import React, { useEffect, useState } from "react";
import { fetchGroupById } from "@/app/lib/data-fetching/groupData";
import FeaturedBookPanel from "@/components/featuredBookPanel";
import DiscussionCard from "@/components/discussionCard";

export const getServerSideProps = fetchGroupById;

const GroupById = ({ group, members, books, prompts, comments }) => {
  const [gptDiscussion, setGptDiscussion] = useState("");
  const [gptSubject, setGptSubject] = useState("");
  const [discussionText, setDiscussionText] = useState("");
  const [subjectText, setSubjectText] = useState("");

  const membersArray = members.map((data: any) => (
    <div key={data.id} className='mb-2 hover:text-gray-600 hover:font-bold'>
      {data.firstName}
    </div>
  ));

  const promptsArray = prompts.map((data: any) => (
    <DiscussionCard key={data.id} prompts={data} promptId={data.id} />
  ));

  const handleDiscussionTextChange = (e) => {
    return gptDiscussion
      ? setDiscussionText(gptDiscussion)
      : setDiscussionText(e.target.value);
    // setDiscussionText(e.target.value && gpt);
  };

  const handleSubjectTextChange = (e) => {
    return gptSubject
      ? setSubjectText(gptSubject)
      : setSubjectText(e.target.value);
  };

  const handleDiscussionTextValue = () => {
    return gptDiscussion ? gptDiscussion : discussionText;
  };

  const handleSubjectTextValue = () => {
    return gptSubject ? gptSubject : subjectText;
  };

  const featuredBook = books.map((data: any) =>
    data.featured === true ? data.title : null
  );

  const featuredAuthor = books.map((data: any) =>
    data.featured === true ? data.author : null
  );

  const fetchDiscussion = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/openai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Create a discussion prompt about the book '${featuredBook[0]}' by ${featuredAuthor[0]}. Don't include the title or author in the prompt. \n\n`,
        }),
      });

      const data = await res.json();
      const discussion = data.completion.trim().replace(/"/g, "");
      setDiscussionText(discussion);
      await fetchSubject(discussion);
    } catch (error) {
      console.error("Error fetching discussion:", error);
    }
  };

  const fetchSubject = async (discussion) => {
    try {
      const res = await fetch(`http://localhost:3000/api/openai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Create a brief one line summary for the following discussion prompt: '${discussion}'`,
        }),
      });

      const data = await res.json();
      const subject = data.completion.trim().replace(/"/g, "");
      setSubjectText(subject);
    } catch (error) {
      console.error("Error fetching subject:", error);
    }
  };

  console.log(discussionText);
  console.log(subjectText);

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
                onClick={fetchDiscussion}
              >
                Generate Prompt
              </button>
            </div>
            <div className='bg-zinc-900 w-8/12 h-90 rounded-2xl mb-4'>
              <div className='p-4'>
                <div className='p-2 flex flex-col bg-zinc-800 w-auto h-14 rounded-2xl mb-2'>
                  <textarea
                    className='bg-zinc-800 w-full h-8 rounded-2xl text-zinc-100 mb-2 resize-none border border-zinc-800 focus:outline-none focus:ring-0 focus:border-transparent'
                    placeholder='Subject here...'
                    value={subjectText}
                    onChange={handleSubjectTextChange}
                  ></textarea>
                </div>

                <div className='relative p-4 flex flex-col bg-zinc-800 w-full h-72 rounded-2xl'>
                  <textarea
                    className='bg-zinc-800 w-auto h-52 rounded-2xl text-zinc-100 mb-2 resize-none border border-zinc-800 focus:outline-none focus:ring-0 focus:border-transparent'
                    placeholder='Start a discussion...'
                    value={discussionText}
                    onChange={handleDiscussionTextChange}
                  ></textarea>
                  <button className='absolute bottom-4 right-4 w-24 p-2 bg-sky-600 rounded-full hover:bg-sky-800 text-zinc-200 font-semibold'>
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col mt-5 w-8/12'>
            {promptsArray}
            {/* <DiscussionCard promptsArray={promptsArray} /> */}

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
