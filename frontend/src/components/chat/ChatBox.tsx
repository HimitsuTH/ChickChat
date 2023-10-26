import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import Messages from "../Messages";

import { useAuth, TUser } from "@/context/AuthContext";
import { useChat, TUserChat } from "@/context/ChatContext";
import { useFetchRecipient } from "@/hooks/useFetchRecipient";

import userIcon from "@/assets/user.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

import { sendMessage, TSendMessage } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

import send from "@/assets/send.png";

import { v4 as uuidv4 } from "uuid";

const ChatBox = () => {
  const { user } = useAuth();
  const { currentChat, createMessage, messages, messageLoading, onlineUsers } =
    useChat();
  const { recipient } = useFetchRecipient(
    currentChat as TUserChat,
    user as TUser
  );

  const { register, handleSubmit, reset } = useForm<TSendMessage>({
    resolver: zodResolver(sendMessage),
  });

  // scroll To Bottom when user send message chat
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const onSubmit = (body: TSendMessage) => {
    const { text } = body;

    if (!text || text === "") return;
    createMessage(user as TUser, text, currentChat as TUserChat);
    reset();
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const checkOnline = onlineUsers?.some((user) => user?.userId === recipient?.id)


  return (
    <Card className="flex-1 bg-white ml-2  h-full shadow-none border-none ">
      <div className=" flex flex-col  h-full justify-between px-4 gap-2">
        <CardHeader className="">
          <CardTitle className=" flex gap-x-4">
            <Avatar className=" h-8 w-8">
              <AvatarImage src={userIcon} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-x-2">
              <p>{recipient?.username} </p>
              <p className=" text-sm text-slate-500">{recipient?.email}</p>
            </div>
          </CardTitle>
          <CardDescription >
            {checkOnline
              ? "Online"
              : "Offline"}
          </CardDescription>
        </CardHeader>
        <CardContent
          className=" bg-slate-50  p-4 rounded overflow-x-hidden h-4/6 overflow-y-scroll"
          ref={chatContainerRef}
        >
          {messageLoading ? (
            <p>loading message...</p>
          ) : (
            <div className=" flex flex-col  justify-end  gap-y-2">
              <p className=" flex justify-center items-center p-2">
                New message
              </p>
              {messages.map((message) => (
                <div
                  key={`${uuidv4()}`}
                  className={`flex ${
                    message.senderId == user?.id && " justify-end"
                  }`}
                >
                  <Messages message={message} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className=" ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex gap-x-5  justify-end items-center w-full"
          >
            <Input
              {...register("text")}
              placeholder="Message..."
              className=" w-full"
            />
            <Button type="submit" className="flex justify-center items-center">
              <img alt="send" src={send} className="h-6 w-6" />
            </Button>
          </form>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ChatBox;
