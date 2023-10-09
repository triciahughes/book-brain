import React from "react";
import { useRouter } from "next/router";

type TextBoxProps = {
  promptStr: string;
  handleDiscussionTextChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

const TextBox: React.FC<TextBoxProps> = ({
  promptStr,
  handleDiscussionTextChange,
}) => {
  const router = useRouter();

  const dynamicTextBox = () => {
    if (router.route === "/groups/[id]") {
      return (
        <textarea
          className='bg-zinc-800 w-auto h-52 text-zinc-100 mb-2 resize-none border border-zinc-800 focus:outline-none focus:ring-0 focus:border-transparent'
          placeholder='Start a discussion...'
          value={promptStr}
          onChange={handleDiscussionTextChange}
        ></textarea>
      );
    } else if (router.route === "/discussion/[id]") {
      return (
        <textarea
          className='bg-zinc-800 w-6/8 h-full text-zinc-100 my-2 resize-none border border-zinc-800 rounded-2xl focus:outline-none focus:ring-0 focus:border-transparent'
          placeholder='Write a comment...'
          value={promptStr}
          onChange={handleDiscussionTextChange}
        ></textarea>
      );
    }
  };

  return <>{dynamicTextBox()}</>;
};

export default TextBox;
