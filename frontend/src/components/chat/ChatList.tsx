import React from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/context/ChatContext";

const ChatList = () => {
  const { userChats, uLoading } = useChat();

  // console.log(userChats)

  return (
    <aside className="w-[250px] shadow bg-white rounded overflow-y-scroll overflow-x-hidden">
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
