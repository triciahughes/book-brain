import React from "react";

const commentCard = () => {
  return (
    <>
      <div className='flex flex-col border border-white-200 rounded-lg py-2 px-4 mb-4 hover:bg-gray-900'>
        <div className='text-sm text-purple-600 font-semibold hover:underline'>
          Author
        </div>
        <div className='text-base'>
          {" "}
          Comment here here is some text to test how it looks when a user
          comments something lengthy and in depth
        </div>
      </div>
    </>
  );
};

export default commentCard;
