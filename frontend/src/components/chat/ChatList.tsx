import React from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/context/ChatContext";

const ChatList = () => {
    const { userChat } = useChat();

  return (
    <aside className="w-[250px] shadow bg-white rounded overflow-y-scroll overflow-x-hidden">
      {userChat.length > 0 ? (
        userChat.map((chat) => <ChatItem chat={chat} key={chat.id} />)
      ) : (
        <p className=" text-center m-4 font-semibold">No chat</p>
      )}
    </aside>
  );
};

export default ChatList;
