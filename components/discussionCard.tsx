import React from "react";
import Image from "next/image";
import RightArrow from "../public/right-arrow.png";
import { useRouter } from "next/router";

const DiscussionCard = ({ prompts, promptId, subject }) => {
  const router = useRouter();
  console.log(prompts);

  const charLimit = 115;
  const subCharLimit = 20;

  const promptStr = prompts.promptStr.slice(0, charLimit);
  const subjectStr = subject.slice(0, subCharLimit);

  const handleDiscussionClick = () => {
    console.log("go to discussion page", promptId);
    router.push(`/discussion/${promptId}`);
  };

  return (
    <>
      <div
        className='flex flex-col border border-zinc-400 rounded-xl py-2 px-4 mb-4 hover:bg-zinc-900'
        onClick={handleDiscussionClick}
      >
        <div className='text-sm text-purple-400 font-semibold'>
          Subject here ...
        </div>
        <div className='flex flex-row'>
          <div className='text-base'>{promptStr}...</div>
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
