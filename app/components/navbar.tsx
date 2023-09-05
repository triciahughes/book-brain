"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center my-5 mx-10 border-b border-gray-200 pb-4'>
      <div className='flex items-center space-x-12'>
        <h1>Logo</h1>
        <button onClick={() => console.log("Dashboard clicked")}>
          Dashboard
        </button>
        <button onClick={() => (window.location.href = "/pages/groups")}>
          Groups
        </button>
        <button onClick={() => console.log("Settings Clicked")}>
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
