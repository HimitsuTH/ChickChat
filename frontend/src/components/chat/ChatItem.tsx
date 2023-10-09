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

  return (
    <NavLink
      to={`/${chat.id}`}
      onClick={() => getCurrentChat(chat)}
      className={({ isActive }: { isActive: boolean }) =>
        ` relative ${
          isActive && " bg-slate-200 "
        } text-center p-3 shadow m-2 flex items-center justify-start gap-x-4 cursor-pointer rounded-xl text-black`
      }
    >
      <Avatar className=" h-8 w-8">
        <AvatarImage src={userIcon} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p>{recipient?.username}</p>
        <p className="hidden md:block">12.13</p>
      </div>
      <div className=" absolute right-5 hidden md:flex">
        <p>
          {onlineUsers?.some((user) => user?.userId === recipient?.id)
            ? "Online"
            : "Offline"}
        </p>
        <div className={`w-[10px] h-[10px] rounded-full ${onlineUsers?.some((user)=> user.userId === recipient?.id) ? "bg-green-600": " bg-gray-200"}`}/>

       
      </div>
    </NavLink>
  );
};

export default ChatItem;
