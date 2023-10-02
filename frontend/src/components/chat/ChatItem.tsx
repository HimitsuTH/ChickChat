import React, { useEffect, useState } from "react";
import { TUserChat } from "@/context/ChatContext";
import { TUser } from "@/context/AuthContext";
import { useAuth } from "@/context/AuthContext";

import userIcon from "../../assets/user.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import axios from "axios";
import { baseUrl } from "@/lib/service";
import { NavLink } from "react-router-dom";

const ChatItem = ({ chat }: { chat: TUserChat }) => {
  const { user } = useAuth();
  const [recipient, setRecipient] = useState<TUser | null>(null);

  const recipientUser = chat?.members?.find(
    (member) => member.userId !== user?.id
  );

  const getRecipientUSer = async () => {
    try {
      if (recipientUser) {
        const res = await axios.get(
          `${baseUrl}/user/find/${recipientUser.userId}`
        );

        setRecipient(res.data);
      } else {
        console.log("recipient not founded.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(recipient);

  useEffect(() => {
    getRecipientUSer();
  }, [chat]);

  return (
    <NavLink
      to={`/${chat.id}`}
      className={({ isActive }: { isActive: boolean }) =>
        `${
          isActive && " bg-slate-50 "
        } text-center p-3 shadow m-2 flex items-center justify-start gap-x-4 cursor-pointer rounded-xl text-black`
      }
    >
      {/* <div className=" text-center p-3 shadow m-2 flex items-center justify-center gap-x-8 cursor-pointer">
        
      </div> */}
      <Avatar className=" h-8 w-8">
        <AvatarImage src={userIcon} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p>{recipient?.username}</p>
        <p>12.13</p>
      </div>
    </NavLink>
  );
};

export default ChatItem;
