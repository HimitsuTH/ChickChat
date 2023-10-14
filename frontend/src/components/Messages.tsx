import React from "react";
import moment from "moment";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAuth } from "@/context/AuthContext";
import { TMessage } from "@/context/ChatContext";

import userIcon from "@/assets/user.png";
import selfIcon from "@/assets/hacker.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessagesProps {
  message: TMessage; // Make sure the prop name matches 'message'
}

const Messages: React.FC<MessagesProps> = ({ message }) => {
  const { user } = useAuth();

  return (
    <div className={`flex  max-w-[50%]`}>
      <HoverCard>
        <HoverCardTrigger>
          <div
            className={`flex items-center ${
              message.senderId == user?.id && " flex-row-reverse"
            }`}
          >
            <Avatar
              className={`h-8 w-8 ${
                message.senderId == user?.id ? " ml-2" : "mr-2 "
              }`}
            >
              <AvatarImage
                src={message.senderId == user?.id ? selfIcon : userIcon}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p
              className={` break-all ${
                message.senderId == user?.id
                  ? " bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-300 to-purple-400  text-white"
                  : "bg-slate-200"
              } p-2  rounded-xl `}
            >
              {message.text}
            </p>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className=" w-auto">
          {moment(message.createdAt).format("DD MMMM YYYY h:mm:ss A")}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default Messages;
