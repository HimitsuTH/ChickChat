import React, { createContext, useState, useContext, useEffect } from "react";
import { TUser } from "./AuthContext";
import axios from "axios";
import { baseUrl } from "@/lib/service";

export interface TUserChat {
  id: number;
  members: [
    {
      userId: string;
    }
  ];
}

// type TGetUserChat = () => Promise<void>;

interface ChatContextType {
  user?: TUser | null;
  userChat: TUserChat[];
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: TUser | null;
}) => {
  const [userChat, setUserChat] = useState<TUserChat[]>([]);
 

  const getUserChat = async () => {
    try {
      if (!user) {
        return console.log("User not founded.");
      }
      const res = await axios.get(`${baseUrl}/chat/user/${user.id}`);
      setUserChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserChat();
  }, [user]);

  return (
    <ChatContext.Provider value={{ userChat }}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
