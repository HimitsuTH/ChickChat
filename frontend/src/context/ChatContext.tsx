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
export interface TMessage {
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

interface ChatContextType {
  user: TUser | null;
  userChats: TUserChat[];
  currentChat: TUserChat | null;
  uLoading: boolean;
  potentialChat: TUser[];
  messages: TMessage[];
  messageLoading: boolean;
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
  const [uLoading, setULoading] = useState(false);
  const [currentChat, setCurrentChat] = useState<TUserChat | null>(() => {
    const saveItem = localStorage.getItem("currentChat");
    const chatInfo = saveItem ? JSON.parse(saveItem) : null;
    return chatInfo;
  });

  const [potentialChat, setPotentialChat] = useState<TUser[]>([]);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [messageLoading, setMessageLoading] = useState(false);
  // const [messageError , setMessageError] = useState(null);


  //@Create Chat
  const createChat = useCallback(async (firstId: string, secondId: string) => {
    try {
      const res = await axios.post(`${baseUrl}/chat`, {
        firstId,
        secondId,
      });
      const data = res.data;

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


  //@Create Message
  const createMessage = useCallback(
    async (user: TUser, text: string, chat: TUserChat) => {
      try {
        const res = await axios.post(`${baseUrl}/message`, {
          chatId: chat?.id,
          senderId: user.id,
          text,
        });
        const message = res.data

        setMessages((prev)=> [...prev, message])
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
    messages
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
