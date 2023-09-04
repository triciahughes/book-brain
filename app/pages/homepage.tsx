import React from "react";

const Home = () => {
  return (
    <div>
      <div className='flex justify-evenly items-center mx-10 mb-10 mt-10'>
        {/* image here? */}
        <div>Groups you host:</div>
        <div>Groups you are in:</div>
      </div>
      <div className='flex justify-evenly items-center mx-10 mb-10'>
        {/* cards here */}
        <div>
          <div>Host Groups Here</div>
          <div>Host Groups Here</div>
          <div>Host Groups Here</div>
          <div>Host Groups Here</div>
        </div>
        <div>
          <div>Member Groups Here</div>
          <div>Member Groups Here</div>
          <div>Member Groups Here</div>
          <div>Member Groups Here</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
