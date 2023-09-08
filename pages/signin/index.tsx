import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/dashboard",
    });
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <div className='flex flex-col items-center'>
        Welcome to Book Brain - Sign in or Sign up
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-5'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
            className='text-black hover:text-white rounded-full hover:bg-gray-400 '
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
            className='text-black hover:text-white rounded-full hover:bg-gray-400'
          />
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          >
            Sign in
          </button>
          <br />
          <p className='text-sm'>Don't have an account?</p>
          <button
            className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full'
            onClick={handleSignUp}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
