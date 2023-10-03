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

export interface TUserChat {
  id: number;
  members: { userId: string }[];
}

interface ChatContextType {
  user: TUser | null;
  userChats: TUserChat[];
  currentChat: TUserChat | null;
  potentialChat: TUser[];
  uLoading: boolean;
  getCurrentChat: (chat: TUserChat | null) => void;
  createChat: (firstId: string, secondId: string) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider: React.FC<{
  children: ReactNode;
  user: TUser | null;
}> = ({ children, user }) => {
  const [userChats, setUserChats] = useState<TUserChat[]>([]);
  const [uLoading, setULoading] = useState(false);
  const [currentChat, setCurrentChat] = useState<TUserChat | null>(null);
  const [potentialChat, setPotentialChat] = useState<TUser[]>([]);

  const createChat = useCallback(async (firstId: string, secondId: string) => {
    try {
      const res = await axios.post(`${baseUrl}/chat`, {
        firstId,
        secondId,
      });
      const data = res.data;

      console.log(data)

      setUserChats((prevChats) => [...prevChats, data]);
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

        console.log(pChats);

        setPotentialChat(pChats);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    getUsers();
  }, [user, userChats]);

  const getCurrentChat = useCallback((chat: TUserChat | null) => {
    setCurrentChat(chat);
  }, []);

  const chatContextValue: ChatContextType = {
    user,
    userChats,
    currentChat,
    potentialChat,
    uLoading,
    getCurrentChat,
    createChat,
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
