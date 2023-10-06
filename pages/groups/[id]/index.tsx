import React, { useState } from "react";
import { fetchGroupById } from "@/app/lib/data-fetching/groupData";
import FeaturedBookPanel from "@/components/featuredBookPanel";
import DiscussionCard from "@/components/discussionCard";

export const getServerSideProps = fetchGroupById;

type GroupByIdProps = {
  group: Object;
  members: Array<Object>;
  prompts: Array<Object>;
  comments: Array<Object>;
  books: Array<Book>;
};

type Book = {
  id: number;
  title: string;
  author: string;
  featured: boolean;
  image: string;
};

const GroupById: React.FC<GroupByIdProps> = ({
  group,
  members,
  books,
  prompts,
  comments,
}) => {
  const [gptDiscussion, setGptDiscussion] = useState("");
  const [gptSubject, setGptSubject] = useState("");
  const [promptStr, setPromptStr] = useState("");
  const [subjectText, setSubjectText] = useState("");
  const [createPromptView, setCreatePromptView] = useState(false);

  const membersArray = members.map((data: any) => (
    <div key={data.id} className='mb-2 hover:text-gray-600 hover:font-bold'>
      {data.firstName}
    </div>
  ));

  const promptsArray = prompts.map((data: any) => (
    <DiscussionCard
      key={data.id}
      prompts={data}
      promptId={data.id}
      subject={subjectText}
    />
  ));

  const handleDiscussionTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    return gptDiscussion
      ? setPromptStr(gptDiscussion)
      : setPromptStr(e.target.value);
  };

  const handleSubjectTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    return gptSubject
      ? setSubjectText(gptSubject)
      : setSubjectText(e.target.value);
  };

  const featuredBookData = books.find((data: Book) => data.featured === true);

  const featuredBook = featuredBookData ? featuredBookData?.title : null;

  const featuredAuthor = featuredBookData ? featuredBookData?.author : null;

  const handleCreatePromptViewToggle = () => {
    setCreatePromptView(!createPromptView);
  };

  const fetchDiscussion = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/openai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Create a discussion prompt about the book '${featuredBook}' by ${featuredAuthor}. Don't include the title or author in the prompt. \n\n`,
        }),
      });

      const data = await res.json();
      const discussion = data.completion.trim().replace(/"/g, "");
      setPromptStr(discussion);
      await fetchSubject(discussion);
    } catch (error) {
      console.error("Error fetching discussion:", error);
    }
  };

  const fetchSubject = async (discussion: String) => {
    try {
      const res = await fetch(`http://localhost:3000/api/openai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `In 10 words or less, create a subject line for the following discussion prompt: '${discussion}'`,
        }),
      });

      const data = await res.json();
      const subject = data.completion.trim().replace(/"/g, "");
      setSubjectText(subject);
    } catch (error) {
      console.error("Error fetching subject:", error);
    }
  };

  const handlePromptPost = async () => {
    try {
      fetch(`http://localhost:3000/api/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: books[0].id,
          promptStr: promptStr,
        }),
      }).then(() => {
        setPromptStr("");
        setSubjectText("");
        setCreatePromptView(false);
      });
    } catch (error) {
      console.error("Error posting prompt:", error);
    }
  };

  const createPromptViewToggle = createPromptView ? (
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
              className='bg-zinc-800 w-auto h-8 text-zinc-100 mb-2 resize-none border border-zinc-800 focus:outline-none focus:ring-0 focus:border-transparent truncate overflow-y-hidden'
              placeholder='Subject here...'
              value={`${subjectText}`}
              onChange={handleSubjectTextChange}
            ></textarea>
          </div>

          <div className='relative p-4 flex flex-col bg-zinc-800 w-full h-72 rounded-2xl'>
            <textarea
              className='bg-zinc-800 w-auto h-52 text-zinc-100 mb-2 resize-none border border-zinc-800 focus:outline-none focus:ring-0 focus:border-transparent'
              placeholder='Start a discussion...'
              value={promptStr}
              onChange={handleDiscussionTextChange}
            ></textarea>
            <button
              className='absolute bottom-4 right-4 w-24 p-2 bg-sky-600 rounded-full hover:bg-sky-800 text-zinc-200 font-semibold'
              onClick={handlePromptPost}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className=''>
      <div className='flex flex-row space-x-96 mb-4'>
        <div className='flex-nowrap text-3xl font-bold text-white mr-8'>
          Discussion
        </div>
        <button
          className='text-zinc-200 font-semibold w-48 p-2 bg-purple-600 rounded-full hover:bg-purple-800'
          onClick={handleCreatePromptViewToggle}
        >
          Create Discussion
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className='flex flex-row'>
        <FeaturedBookPanel books={books} membersArray={membersArray} />
        <div className='flex flex-col w-full max-w-10/12'>
          {createPromptViewToggle}

          <div className='flex flex-col mt-5 w-8/12'>{promptsArray}</div>
        </div>
      </div>
    </div>
  );
};

export default GroupById;
