import React from "react";
import { Outlet } from "react-router-dom";
import { useChat } from "@/context/ChatContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ChatList from "./ChatList";
import { TUser, useAuth } from "@/context/AuthContext";
import { Button } from "../ui/button";

import userIcon from "@/assets/user.png";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Index = () => {
  const { currentChat, potentialChat, createChat } = useChat();
  const { user } = useAuth();

  return (
    <main className="flex flex-row justify-between mt-2 h-5/6 ">
      <ChatList />

      <Outlet />
      {!currentChat && (
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
                    <Card className=" p-2" key={p.email}>
                      <CardHeader className="flex justify-center items-center">
                        <CardTitle>
                          <Avatar className=" h-8 w-8">
                            <AvatarImage src={userIcon} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </CardTitle>
                        <CardDescription>{p.username} </CardDescription>
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
      )}
    </main>
  );
};
