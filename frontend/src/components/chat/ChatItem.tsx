import React from "react";
import { TUserChat, useChat } from "@/context/ChatContext";
import { TUser, useAuth } from "@/context/AuthContext";

import userIcon from "@/assets/user.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useFetchRecipient } from "@/hooks/useFetchRecipient";

import { NavLink } from "react-router-dom";

const ChatItem = ({ chat }: { chat: TUserChat }) => {
  const { user } = useAuth();
  const { getCurrentChat, onlineUsers } = useChat();

  // console.log("members",chat.id, chat.members)

  const { recipient } = useFetchRecipient(chat, user as TUser);

  const checkOnline = onlineUsers?.some(
    (user) => user?.userId === recipient?.id
  );

  return (
    <NavLink
      to={`/${chat.id}`}
      onClick={() => getCurrentChat(chat)}
      className={({ isActive }: { isActive: boolean }) =>
        ` relative ${
          isActive &&
          " bg-gradient-to-r from-indigo-300 to-purple-400 text-white "
        } text-center p-2 shadow m-2 flex items-center justify-around gap-x-4 cursor-pointer rounded-xl text-black`
      }
    >
      <div className="flex md:items-center gap-x-2 flex-1 ">
        <Avatar className=" h-8 w-8 bg-white">
          <AvatarImage src={userIcon} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-2 ">
          <p className="truncate">{recipient?.username}</p>
          <p className="hidden md:block">12.13</p>
        </div>
      </div>
      <div className="  right-5 flex">
        <p className="block">{checkOnline ? "Online" : "Offline"}</p>
        <div
          className={`w-[10px] h-[10px] rounded-full border border-gray-500 ${
            checkOnline ? "bg-green-600" : " bg-gray-200"
          }`}
        />
      </div>
    </NavLink>
  );
};

export default ChatItem;
