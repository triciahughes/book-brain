import React from "react";

const Footer = () => {
  return (
    <div>
      <div className='flex justify-center items-center my-5 mx-10 border-t border-gray-200 pt-4'>
        <p className='text-gray-700 text-sm underline underline-offset-2 hover:underline-offset-4'>
          Created by{" "}
          <a href='https://github.com/triciahughes'>@Tricia Hughes</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
