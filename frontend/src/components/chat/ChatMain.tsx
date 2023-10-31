import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TUser, useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { Button } from "../ui/button";

import { useNavigate, NavigateFunction } from "react-router-dom";

import userIcon from "@/assets/user.png";

import { Icons } from "@/components/icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatMain = () => {
  const { potentialChat, createChat, onlineUsers } = useChat();
  const { user } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  return (
    <Card className="flex-1 bg-white ml-2 h-full  rounded overflow-y-scroll overflow-x-hidden  shadow-none border-none">
      <CardHeader className="flex justify-center items-center text-center">
        <CardTitle> Welcome To ChickChat</CardTitle>
        <CardDescription>Chat Application</CardDescription>
      </CardHeader>
      <div className=" flex  w-full ">
        <CardContent className=" flex flex-col">
          <h2 className=" font-semibold m-2">Add Chats </h2>
          <div className="flex  gap-4 flex-wrap  ml-0 justify-center md:justify-normal md:ml-14">
            {potentialChat.length > 0 ? (
              potentialChat.map((p: TUser) => (
                <Card className=" p-2 relative" key={p.email + "1"}>
                  <CardHeader className="flex justify-center items-center ">
                    <CardTitle className=" flex flex-col justify-center items-center gap-y-2">
                      <div className="flex justify-center items-center absolute top-3 right-3">
                        <div
                          className={`w-[10px] h-[10px] rounded-full border border-gray-500 ${
                            onlineUsers?.some((user) => user.userId === p?.id)
                              ? "bg-green-600"
                              : " bg-gray-200"
                          }`}
                        />
                      </div>
                      <Avatar className=" h-8 w-8">
                        <AvatarImage src={userIcon} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p>{p?.username}</p>
                    </CardTitle>
                    <CardDescription>{p?.email}</CardDescription>
                  </CardHeader>
                  <CardFooter className=" flex gap-2 mt-5">
                    <Button
                      variant="outline"
                      onClick={() =>
                        createChat(
                          user?.id as string,
                          p?.id as string,
                          navigate
                        )
                      }
                    >
                      <Icons.message className=" h-5 w-5" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => console.log("ADD")}
                      className=" text-xs"
                    >
                       <Icons.addFriend className=" h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div>No</div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ChatMain;
