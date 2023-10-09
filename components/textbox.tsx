import React from "react";
import { useRouter } from "next/router";

type TextBoxProps = {
  promptStr: string;
  handleDiscussionTextChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
};

const textbox: React.FC<TextBoxProps> = ({
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
      return <textarea></textarea>;
    }
  };

  return <>{dynamicTextBox()}</>;
};

export default textbox;
