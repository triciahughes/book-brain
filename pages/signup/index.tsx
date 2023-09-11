import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { sign } from "crypto";
import { FormEvent } from "react";
// import { postUserData } from "../../app/lib/data-fetching/userData";

export const postUserData = async (data: any) => {
  const response = await fetch("/api/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "An error occurred");
  }

  return response.json();
};

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const router = useRouter();

  const { data: session, status, update } = useSession();

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      passwordHash: password,
    };

    try {
      console.log("Sending this data:", userData);
      const response = await postUserData(userData);
      console.log("Response:", response);

      if (response && response.success) {
        // Await for the signIn process to complete
        const result = await signIn("credentials", {
          email: email,
          password: password,
          callbackUrl: "/dashboard",
        });

        console.log("SignIn Result:", result);

        // Once signIn is completed, check for session
        // or directly navigate to dashboard as the user should be authenticated at this point.
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Error creating user:", error.message);
    }
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
        <form
          onSubmit={handleSignupSubmit}
          className='flex flex-col gap-4 mt-5'
        >
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
