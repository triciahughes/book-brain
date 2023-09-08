import React, { useState } from "react";
// import { signUp } from "next-auth/react";
import { useRouter } from "next/router";
// import { postUserData } from "../../app/lib/data-fetching/userData";

export const postUserData = async (data) => {
  const response = await fetch("/api/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    } else {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        passwordHash: password,
        hostGroups: [],
        memberships: [],
        comments: [],
      };

      try {
        await postUserData(userData);
        router.push("/dashboard");
      } catch (error) {
        console.error("Error creating user:", error.message);
      }
    }
    router.push("/dashboard");
  };

  const handleSignIn = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    router.push("/signin");
  };

  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <div className='flex flex-col items-center'>
        Please create your account
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-5'>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            required
            className='text-black hover:text-white rounded-full hover:bg-gray-400'
          />
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            required
            className='text-black hover:text-white rounded-full hover:bg-gray-400'
          />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
            className='text-black hover:text-white rounded-full hover:bg-gray-400'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
            className='text-black hover:text-white rounded-full hover:bg-gray-400'
          />
          <input
            type='password'
            value={passwordConfirm}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
            className='text-black hover:text-white rounded-full hover:bg-gray-400'
          />
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          >
            Sign Up
          </button>
          <br />
          <p className='text-sm'>Already have an account?</p>
          <button
            className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full'
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
