import React from "react";
import { useSession } from "next-auth/react";

type CommentCardProps = {
  commentData: {
    comment: string;
    userId: number;
  };
};

const commentCard: React.FC<CommentCardProps> = ({ commentData }) => {
  const { data: session } = useSession();

  const renderEditDeleteBtns = () => {
    return session?.user.id === commentData.userId ? (
      <div className='text-sm flex flex-row gap-x-6'>
        <div className='text-purple-400 font-bold hover:text-purple-800 hover:cursor-pointer'>
          Edit
        </div>
        <div className='text-red-400 font-bold hover:text-red-800 hover:cursor-pointer'>
          Delete
        </div>
      </div>
    ) : (
      <div></div>
    );
  };
  return (
    <>
      <div className='flex flex-col border border-white-200 rounded-lg py-2 px-4 mb-4 hover:bg-zinc-900'>
        <div className='flex justify-between '>
          <div className='text-sm text-purple-600 font-semibold hover:underline'>
            Author {commentData.userId}
          </div>
          {renderEditDeleteBtns()}
        </div>
        <div className='text-base'> {commentData.comment}</div>
      </div>
    </>
  );
};

export default commentCard;
