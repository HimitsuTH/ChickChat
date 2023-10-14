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

import userIcon from "@/assets/user.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatMain = () => {
  const { potentialChat, createChat, onlineUsers } = useChat();
  const { user } = useAuth();
  return (
    <Card className="flex-1 bg-white ml-2 h-full shadow rounded ">
      <CardHeader className="flex justify-center items-center">
        <CardTitle> Welcome To ChickChat</CardTitle>
        <CardDescription>Chat Application</CardDescription>
      </CardHeader>
      <div className=" flex  mx-5 overflow-x-auto">
        <CardContent>
          <h2 className=" font-semibold m-2">Friends</h2>
          <div className=" flex  gap-4 flex-wrap">
            {potentialChat.length > 0 ? (
              potentialChat.map((p: TUser) => (
                <Card className=" p-2 relative" key={p.email}>
                  <CardHeader className="flex justify-center items-center">
                    <CardTitle>
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
                    </CardTitle>
                    <CardDescription>
                      <p className=" font-medium text-black">{p.username}</p>
                     
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      variant="default"
                      onClick={() =>
                        createChat(user?.id as string, p.id as string)
                      }
                    >
                      Follow
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
