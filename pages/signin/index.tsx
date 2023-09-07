import React from "react";
import { signIn } from "next-auth/react";

const Signin = () => {
  return (
    <div className='flex justify-evenly items-center mx-10 mb-5 mt-10'>
      <button
        onClick={() => signIn("credentials", { callbackUrl: "/dashboard" })}
      >
        Sign in
      </button>
    </div>
  );
};

export default Signin;
