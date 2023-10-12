import React, { useState } from "react";
import { fetchDiscussionById } from "@/app/lib/data-fetching/discussionData";
import FeaturedBookPanel from "@/components/featuredBookPanel";
import CommentCard from "@/components/commentCard";
import Image from "next/image";
import LeftArrow from "../../../public/left-arrow.png";
import { useRouter } from "next/router";
import TextBox from "@/components/textbox";
import { useSession } from "next-auth/react";
import Modal from "@/components/modal";
import { FormEvent } from "react";

export const getServerSideProps = fetchDiscussionById;

type DiscussionByIdProps = {
  members: Array<Object>;
  discussion: {
    promptStr: string;
    id: number;
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
  const { data: session } = useSession();
  const router = useRouter();
  const [commentTextboxRender, setCommentTextboxRender] = useState(false);
  const [commentStr, setCommentStr] = useState("");
  const [deleteModalRender, setDeleteModalRender] = useState(false);
  const [deleteComId, setDeleteComId] = useState(0);

  const membersArray = members.map((data: any) => (
    <div key={data.id} className='mb-2 hover:text-gray-600 hover:font-bold'>
      {data.firstName}
    </div>
  ));

  const handleDeleteClick = (e: React.FormEvent<HTMLFormElement>) => {
    setDeleteModalRender(() => !deleteModalRender);
    setDeleteComId(parseInt(e.currentTarget.value));
    // console.log("from handleDelete", e.currentTarget.value);
    // deleteComConfirm(e.currentTarget.value);
  };

  const deleteComConfirm = () => {
    console.log("delete comment confirm", deleteComId);
    setDeleteModalRender(() => !deleteModalRender);
    deleteComment();
  };

  const deleteComment = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/delComment`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: deleteComId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setDeleteComId(0);
        router.reload();
      } else {
        console.error("Failed to delete comment.", await res.text());
      }
    } catch (error) {
      console.log("Error during fetch:", error);
    }
  };

  const commentsArr = comments.map((data: any) => (
    <CommentCard
      key={data.id}
      id={data.id}
      commentData={data}
      handleDeleteClick={handleDeleteClick}
    />
  ));

  const handleBackClick = () => {
    console.log("go back to groups / discussions page");
    router.push(`/groups/${books.groupId}`);
  };

  const handleCommentClick = () => {
    setCommentTextboxRender(!commentTextboxRender);
  };

  const countCommentStr = () => {
    return commentStr.length > 550 ? `bg-sky-600/50` : `bg-sky-600`;
  };

  const handleCommentTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentStr(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/addComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: commentStr,
          promptId: discussion.id,
          userId: session?.user.id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        router.reload();
        setCommentTextboxRender(false);
      } else {
        console.error("Failed to post comment.", await res.text());
      }
    } catch (error) {
      console.log("Error during fetch:", error);
    }
  };

  return (
    <div>
      <div className='flex flex-row static'>
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
                onClick={handleCommentSubmit}
              >
                Done
              </button>
            </div>
          ) : (
            <div></div>
          )}

          <div>
            <div className='flex flex-col mt-5 w-8/12'>{commentsArr}</div>
            <div className='relative bottom-96 left-40'>
              {deleteModalRender ? (
                <Modal
                  handleDeleteClick={handleDeleteClick}
                  deleteComConfirm={deleteComConfirm}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionById;
