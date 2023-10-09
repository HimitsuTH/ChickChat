import React from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/context/ChatContext";

const ChatList = () => {
  const { userChats, uLoading } = useChat();

  // console.log(userChats)

  return (
    <aside className="flex items-center md:block shadow bg-white overflow-x-scroll rounded md:overflow-y-scroll md:overflow-x-hidden md:w-[250px]">
      <h1 className="m-4 font-semibold cursor-default">Messages</h1>
      {uLoading ? (
        <div>loading...</div>
      ) : userChats.length > 0 ? (
        userChats.map((chat) => {
          return <ChatItem chat={chat} key={chat.id} />;
        })
      ) : (
        <p className=" text-center m-4 font-semibold">No chat</p>
      )}
    </aside>
  );
};

export default ChatList;
