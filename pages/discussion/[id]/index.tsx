import React, { useState } from "react";
import { fetchDiscussionById } from "@/app/lib/data-fetching/discussionData";
import FeaturedBookPanel from "@/components/featuredBookPanel";
import CommentCard from "@/components/commentCard";
import Image from "next/image";
import LeftArrow from "../../../public/left-arrow.png";
import { useRouter } from "next/router";
import TextBox from "@/components/textbox";

export const getServerSideProps = fetchDiscussionById;

type DiscussionByIdProps = {
  members: Array<Object>;
  discussion: {
    promptStr: string;
  };
  comments: Array<Object>;
  books: {
    id: number;
    groupId: number;
    title: string;
  };
};

const DiscussionById: React.FC<DiscussionByIdProps> = ({
  books,
  members,
  discussion,
  comments,
}) => {
  const router = useRouter();
  const [commentTextboxRender, setCommentTextboxRender] = useState(false);
  const [commentStr, setCommentStr] = useState("");
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
    router.push(`/groups/${books.groupId}`);
  };

  const handleCommentClick = () => {
    setCommentTextboxRender(!commentTextboxRender);
  };

  const commentTextBoxToggle = () => {};

  const countCommentStr = () => {
    return commentStr.length > 550 ? `bg-sky-600/50` : `bg-sky-600`;
  };

  console.log(commentStr.length);

  const handleCommentTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentStr(e.target.value);
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
          <div className='flex justify-end w-8/12'>
            <button
              className={`text-zinc-200 font-semibold ${
                commentTextboxRender ? "w-24" : "w-48"
              } p-2 bg-purple-600 rounded-full hover:bg-purple-800`}
              onClick={handleCommentClick}
            >
              {commentTextboxRender ? "Cancel" : "Add Comment"}
            </button>
          </div>

          {commentTextboxRender ? (
            <div className='relative p-4 mt-4 flex flex-col bg-zinc-900 w-8/12 h-72 rounded-2xl'>
              <TextBox
                promptStr={commentStr}
                handleDiscussionTextChange={handleCommentTextChange}
              />{" "}
              <button
                className={`absolute bottom-10 right-8 w-24 p-2 ${countCommentStr()} rounded-full hover:bg-sky-800 text-zinc-200 font-semibold`}
                onClick={() => console.log("post comment")}
              >
                Done
              </button>
            </div>
          ) : (
            <div></div>
          )}

          <div className='flex flex-col mt-5 w-8/12'>{commentsArr}</div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionById;
