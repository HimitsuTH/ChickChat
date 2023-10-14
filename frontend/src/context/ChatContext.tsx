/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { TUser } from "./AuthContext";
import axios from "axios";
import { baseUrl } from "@/lib/service";

import { io, Socket } from "socket.io-client";

export type TUserChat = {
  id: number;
  members: { userId: string }[];
};
export type TMessage = {
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
};

type TOnlineUsers = {
  userId: string;
  socketId: string;
};

interface ChatContextType {
  user: TUser | null;
  userChats: TUserChat[];
  currentChat: TUserChat | null;
  uLoading: boolean;
  potentialChat: TUser[];
  messages: TMessage[];
  messageLoading: boolean;
  onlineUsers: TOnlineUsers[] | null;
  getCurrentChat: (chat: TUserChat | null) => void;
  createChat: (firstId: string, secondId: string) => void;
  createMessage: (senderId: TUser, text: string, chat: TUserChat) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider: React.FC<{
  children: ReactNode;
  user: TUser | null;
}> = ({ children, user }) => {
  const [userChats, setUserChats] = useState<TUserChat[]>([]);
  const [newChat, setNewChat] = useState<TUserChat | null>(null);
  const [uLoading, setULoading] = useState(false);
  const [currentChat, setCurrentChat] = useState<TUserChat | null>(() => {
    const saveItem = localStorage.getItem("currentChat");
    const chatInfo = saveItem ? JSON.parse(saveItem) : null;
    return chatInfo;
  });

  const [potentialChat, setPotentialChat] = useState<TUser[]>([]);
  const [messages, setMessages] = useState<TMessage[]>([]);

  const [newMessage, setNewMessage] = useState<TMessage | null>(null);
  const [messageLoading, setMessageLoading] = useState(false);
  // const [messageError , setMessageError] = useState(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState(null);

  // console.log(socket);
  // console.log(onlineUsers);

  //===========================================================
  //@Socket.io
  //===========================================================
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // add online users
  useEffect(() => {
    if (socket === null) {
      return;
    }
    socket?.emit("addNewUser", user?.id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, user]);

  //send chat to update
  useEffect(() => {
    if (socket === null) return;

    const recipientUser = newChat?.members?.find(
      (member) => member.userId !== user?.id
    );

    if (newChat !== null) {
      socket.emit("createChat", newChat, recipientUser);
    }
    setNewChat(null);
  }, [newChat]);

  // console.log(newChat)

  //receive get chat
  useEffect(() => {
    if (socket === null) return;

    socket.on("getChat", (res) => {
      console.log(res);
      setUserChats((prev) => [...prev, res]);
    });

    return () => {
      socket.off("getChat");
    };
  }, [newChat]);

  //send message
  useEffect(() => {
    if (socket === null) return;

    const recipientUser = currentChat?.members?.find(
      (member) => member.userId !== user?.id
    );


    //check message is not null IF true `emit` data on event sendMessage
    if (newMessage?.text) {
      socket.emit("sendMessage", { ...newMessage, ...recipientUser });
    }

  }, [newMessage, currentChat, socket, user]);

  //receive message
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?.id !== res.chatId) return;

      setMessages((prev) => [...prev, res]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat, newMessage]);

  // console.log(messages);
  // console.log(user);

  //===========================================================
  //@Chat
  //===========================================================
  //Create Chat
  const createChat = useCallback(async (firstId: string, secondId: string) => {
    try {
      const res = await axios.post(`${baseUrl}/chat`, {
        firstId,
        secondId,
      });
      const chat = res.data;

      // console.log(chat)
      setNewChat(chat);

      setUserChats((prevChats) => [...prevChats, chat]);
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  }, []);

  useEffect(() => {
    const getUserChat = async () => {
      try {
        if (!user) {
          console.log("User not found.");
          return;
        }
        setULoading(true);
        const res = await axios.get(`${baseUrl}/chat/user/${user.id}`);
        setUserChats(res.data);
      } catch (err) {
        console.error("Error fetching user chats:", err);
      } finally {
        setULoading(false);
      }
    };
    getUserChat();
  }, [user]);

  //Users not following
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user`);
        const data: TUser[] = response.data;

        const pChats = data.filter((u: TUser) => {
          let isChatCreated = false;
          if (user?.id === u.id) return false;

          if (userChats) {
            isChatCreated =
              userChats.find((chat: TUserChat) =>
                chat?.members?.some((member) => member.userId === u.id)
              ) !== undefined;
          }

          return !isChatCreated;
        });

        // console.log(pChats);

        setPotentialChat(pChats);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    getUsers();
  }, [user, userChats]);

  // set current chat on Click ChatList
  const getCurrentChat = useCallback((chat: TUserChat | null) => {
    localStorage.removeItem("currentChat");
    setCurrentChat(chat);
    localStorage.setItem("currentChat", JSON.stringify(chat));
  }, []);

  //===========================================================
  //@Message
  //===========================================================
  //Create Message
  const createMessage = useCallback(
    async (user: TUser, text: string, chat: TUserChat) => {
      try {
        const res = await axios.post(`${baseUrl}/message`, {
          chatId: chat?.id,
          senderId: user.id,
          text,
        });
        const message = res.data;

        setNewMessage(message);

        setMessages((prev) => [...prev, message]);
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  useEffect(() => {
    const getMessage = async () => {
      try {
        setMessageLoading(true);
        const res = await axios.get(`${baseUrl}/message/${currentChat?.id}`);
        const message = res.data;

        setMessages(message);

        setMessageLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat]);

  const chatContextValue: ChatContextType = {
    user,
    userChats,
    currentChat,
    potentialChat,
    uLoading,
    getCurrentChat,
    createChat,
    createMessage,
    messageLoading,
    messages,
    onlineUsers,
  };

  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === null) {
    throw new Error("useChat must be used within a ChatContextProvider");
  }
  return context;
};
