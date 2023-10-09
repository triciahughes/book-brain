import { type } from "os";
import React from "react";

type CommentCardProps = {
  commentData: {
    comment: string;
  };
};

const commentCard: React.FC<CommentCardProps> = ({ commentData }) => {
  return (
    <>
      <div className='flex flex-col border border-white-200 rounded-lg py-2 px-4 mb-4 hover:bg-zinc-900'>
        <div className='text-sm text-purple-600 font-semibold hover:underline'>
          Author
        </div>
        <div className='text-base'> {commentData.comment}</div>
      </div>
    </>
  );
};

export default commentCard;
