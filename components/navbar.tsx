"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "next-auth/react";

const Navbar = () => {
  // const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center my-5 mx-10 border-b border-gray-200 pb-4'>
      <div className='flex items-center space-x-12'>
        <h1>Logo</h1>
        <button onClick={() => (window.location.href = "/dashboard")}>
          Dashboard
        </button>
        <button onClick={() => (window.location.href = "/groups")}>
          Groups
        </button>
        <button onClick={() => (window.location.href = "/settings")}>
          Settings
        </button>
      </div>
      <div>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    </div>
  );
};

export default Navbar;
