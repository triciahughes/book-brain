import React, { useState } from "react";
import UpArrow from "../public/up-arrow.png";
import DownArrow from "../public/down-arrow.png";

import Image from "next/image";

const FeaturedBookPanel = ({ books, membersArray }) => {
  const [mouseOverImg, setMouseOverImg] = useState(false);
  const [imgClicked, setImgClicked] = useState(false);
  const [memsCollapseClicked, setMemsCollapseClicked] = useState(false);

  const handleImgMouseOver = (e: any) => {
    e.preventDefault();
    setMouseOverImg(true);
  };

  const handleImgMouseLeave = (e: any) => {
    e.preventDefault();
    setMouseOverImg(false);
  };

  const handleImgText = () => {
    return mouseOverImg ? "Click for more info" : null;
  };

  const handleMoreInfoClick = () => {
    setImgClicked((current) => !current);
  };

  const handleMemsCollapseClick = () => {
    setMemsCollapseClicked((current) => !current);
  };

  const handleCollapseClickIcon = () => {
    return memsCollapseClicked ? UpArrow : DownArrow;
  };

  const handleBookPanelHeightAdj = () => {
    return memsCollapseClicked ? "h-screen" : "h-fit";
  };

  const membersToggle = () => (memsCollapseClicked ? membersArray : null);

  const bookArr = books?.map((data: any) =>
    imgClicked ? (
      <div
        className={`flex flex-col place-items-center w-96 ${handleBookPanelHeightAdj()} ml-10 mr-10 bg-zinc-600 rounded-xl`}
      >
        <div className='bg-zinc-600 rounded-xl w-64 h-14 mt-4 mb-2.5'>
          <div className='p-4 font-bold text-sm'>{data.title}</div>
        </div>
        <div key={data.id} className='bg-zinc-200 w-64 h-80 rounded-xl mb-2'>
          {mouseOverImg && (
            <div
              className='absolute ml-14 mt-14 text-white text-center font-bold text-sm p-2'
              onClick={handleMoreInfoClick}
            >
              <div className='font-bold'>Genre:</div>
              <div className='italic text-black'>{data.genre}</div>
              <div className='font-bold'>Author:</div>
              <div className='italic text-black'>{data.author}</div>
              <div className='font-bold'>Date of Publication:</div>
              <div className='italic text-black'>{data.publicationYear}</div>
            </div>
          )}
          <Image
            src={data.image}
            width={150}
            height={250}
            alt='book cover'
            className='ml-14 mt-10 rounded-lg border-2 hover:contrast-50 hover:opacity-50 hover:blur-sm'
            onMouseOver={handleImgMouseOver}
            onMouseLeave={handleImgMouseLeave}
            onClick={handleMoreInfoClick}
          />
        </div>
        <div className='flex flex-row p-4 space-x-2'>
          <div>Members</div>
          <Image
            width={20}
            height={20}
            alt='arrow'
            src={handleCollapseClickIcon()}
            onClick={handleMemsCollapseClick}
            className='hover:cursor-pointer hover:scale-125'
          />
        </div>
        {membersToggle()}
      </div>
    ) : (
      <div
        className={`flex flex-col place-items-center w-96 ${handleBookPanelHeightAdj()} ml-10 mr-10 bg-zinc-400 rounded-xl`}
      >
        <div className='bg-zinc-200 rounded-xl w-64 h-14 mt-4 mb-2.5'>
          <div className='p-4 font-bold text-sm text-black'>{data.title}</div>
        </div>
        <div key={data.id} className='bg-zinc-200 w-64 h-80 rounded-xl mb-2'>
          {mouseOverImg && (
            <div
              className='absolute ml-14 mt-28 text-white text-center font-bold text-sm p-2'
              onClick={handleMoreInfoClick}
            >
              {handleImgText()}
            </div>
          )}
          <Image
            src={data.image}
            width={150}
            height={250}
            alt='book cover'
            className='ml-14 mt-10 rounded-lg border-2 hover:contrast-50 hover:opacity-50 hover:blur-sm'
            onMouseOver={handleImgMouseOver}
            onMouseLeave={handleImgMouseLeave}
            onClick={handleMoreInfoClick}
          />
        </div>
        <div className='flex flex-row p-4 space-x-2'>
          <div>Members</div>
          <Image
            width={20}
            height={20}
            alt='arrow'
            src={handleCollapseClickIcon()}
            onClick={handleMemsCollapseClick}
            className='hover:cursor-pointer hover:scale-125'
          />
        </div>
        {membersToggle()}
      </div>
    )
  );

  return <>{bookArr}</>;
};

export default FeaturedBookPanel;
