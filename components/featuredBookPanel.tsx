import React, { useState } from "react";

import Image from "next/image";

const FeaturedBookPanel = ({ books }) => {
  const [mouseOverImg, setMouseOverImg] = useState(false);
  const [imgClicked, setImgClicked] = useState(false);

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

  const booksArray = books?.map((data: any) =>
    imgClicked ? (
      <div
        key={data.id}
        className='relative mb-4'
        style={{ width: 150, height: 150 }}
      >
        {" "}
        <Image
          src={data.image}
          width={150}
          height={150}
          alt='book cover'
          className='rounded-md border-2 hover:contrast-50 hover:opacity-50 hover:blur-sm'
          onMouseOver={handleImgMouseOver}
          onMouseLeave={handleImgMouseLeave}
          onClick={handleMoreInfoClick}
        />
        {mouseOverImg && (
          <div
            className='absolute space-y-1 left-0 bottom-5 top-4 text-white text-left font-bold text-sm p-3'
            onClick={handleMoreInfoClick}
          >
            <div className='font-bold'>Genre:</div>
            <div className='italic text-gray-400'>{data.genre}</div>
            <div className='font-bold'>Author:</div>
            <div className='italic text-gray-400'>{data.author}</div>
            <div className='font-bold'>Date of Publication:</div>
            <div className='italic text-gray-400'>{data.publicationYear}</div>
          </div>
        )}
      </div>
    ) : (
      <div
        key={data.id}
        className='relative mb-4'
        style={{ width: 150, height: 150 }}
      >
        <Image
          src={data.image}
          width={150}
          height={150}
          alt='book cover'
          className='rounded-md border-2 hover:contrast-50 hover:opacity-50 hover:blur-sm'
          onMouseOver={handleImgMouseOver}
          onMouseLeave={handleImgMouseLeave}
          onClick={handleMoreInfoClick}
        />
        {mouseOverImg && (
          <div
            className='absolute left-0 bottom-5 text-white text-center font-bold text-sm p-2'
            onClick={handleMoreInfoClick}
          >
            {handleImgText()}
          </div>
        )}
        <div className='mt-4 text-center'>{data.title}</div>
      </div>
    )
  );

  return (
    <div className='flex flex-col place-items-center w-96 h-96 ml-10 mr-10 bg-gray-800 rounded-lg'>
      <div className='flex flex-row justify-between place-self-start space-x-7'>
        <div className='p-4 font-bold text-lg'>Featured Book:</div>

        <div className='p-4'>
          <div className='hover:font-extrabold hover:text-lg hover:cursor-pointer'>
            X
          </div>
        </div>
      </div>
      {booksArray}
    </div>
  );
};

export default FeaturedBookPanel;
