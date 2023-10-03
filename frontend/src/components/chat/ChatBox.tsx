import React from "react";

import { useAuth, TUser } from "@/context/AuthContext";
import { useChat, TUserChat } from "@/context/ChatContext";

import userIcon from "@/assets/user.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useFetchRecipient } from "@/Hook/useFetchRecipient";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ChatBox = () => {
  const { user } = useAuth();
  const { currentChat } = useChat();
  const { recipient } = useFetchRecipient(
    currentChat as TUserChat,
    user as TUser
  );

  if (!recipient) return ;

  return (
    <Card className="flex-1 bg-white ml-2 h-full shadow rounded ">
      <div className=" flex flex-col  h-full justify-between px-4 gap-2">
        <CardHeader className="">
          <CardTitle className=" flex gap-x-4">
            <Avatar className=" h-8 w-8">
              <AvatarImage src={userIcon} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{recipient.username}</p>
          </CardTitle>
          <CardDescription>Online</CardDescription>
        </CardHeader>
        <CardContent className=" flex-auto justify-end bg-slate-50 overflow-y-scroll p-2 rounded">
          <p>Card Content</p>
        </CardContent>
        <CardFooter className=" flex gap-x-5">
          <Input /> <Button>🥚</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ChatBox;
