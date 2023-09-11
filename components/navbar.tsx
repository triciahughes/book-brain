"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const handleSignOut = () => {
    router.push("/signin");
    signOut();
  };
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
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Navbar;
