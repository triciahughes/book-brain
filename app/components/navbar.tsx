"use client";
import React from "react";

const Navbar = () => {
  return (
    <div className='flex justify-between items-center my-5 mx-10 border-b border-gray-200 pb-4'>
      <div className='flex items-center space-x-12'>
        <h1>Logo</h1>
        <button onClick={() => console.log("Dashboard clicked")}>
          Dashboard
        </button>
        <button onClick={() => console.log("Groups clicked")}>Groups</button>
        <button onClick={() => console.log("Settings clicked")}>
          Settings
        </button>
      </div>
      <div>
        <button onClick={() => console.log("Sign out clicked")}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
