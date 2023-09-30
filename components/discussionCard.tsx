import React from "react";
import Image from "next/image";
import RightArrow from "../public/right-arrow.png";

const DiscussionCard = ({ books }) => {
  return (
    <>
      <div className='flex flex-col border border-zinc-400 rounded-xl py-2 px-4 mb-4 hover:bg-zinc-900'>
        <div className='text-sm text-purple-400 font-semibold'>
          Discussion Subject
        </div>
        <div className='flex flex-row'>
          <div className='text-base'>
            {" "}
            Discussion prompt here - here is some text to test ... and in depth
            ... here is more text .. let's keep going!!!
          </div>
          <div className='p-2 mb-4 ml-1'>
            <Image
              src={RightArrow}
              height={24}
              width={24}
              alt='arrow'
              className='hover:scale-125'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscussionCard;
