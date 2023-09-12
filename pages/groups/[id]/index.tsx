import React from "react";
import { fetchGroupById } from "@/app/lib/data-fetching/groupData";

export const getServerSideProps = fetchGroupById;

const GroupById = ({ group, members, books, prompts, comments }) => {
  //   console.log(group);
  //   console.log(members);
  console.log(books);
  console.log(prompts);
  console.log(comments);
  return (
    <div>
      <div>{group.name}</div>
      <div>Members:</div>
      <div>{members.map((data: any) => data.firstName)}</div>
    </div>
  );
};

export default GroupById;
