import React from "react";
import ChatItem from "./ChatItem";
import { useChat } from "@/context/ChatContext";

import { Skeleton } from "@/components/ui/skeleton";
// import { useAuth } from "@/context/AuthContext";

const ChatList = ({ isOpen }: { isOpen: boolean }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const { userChats, uLoading } = useChat();

  return (
    <aside
      // className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform"
      className={`w-[230px] absolute ${
        !isOpen && "-translate-x-full"
      }  block  bg-white  rounded overflow-y-scroll 
       overflow-x-hidden md:w-[250px] md:static h-5/6 md:h-auto z-50 transition-transform md:transition-none md:translate-x-0 `}
    >
      <h1 className="m-4 font-semibold cursor-default">Messages</h1>

      {uLoading ? (
        <div className="flex justify-center flex-col items-center gap-y-4">
          <Skeleton className="w-[200px] h-[40px]" />
          <Skeleton className="w-[200px] h-[40px]" />
          <Skeleton className="w-[200px] h-[40px]" />
          <Skeleton className="w-[200px] h-[40px]" />
        </div>
      ) : userChats.length > 0 ? (
        userChats.map((chat) => {
          return <ChatItem chat={chat} key={chat.id} />;
        })
      ) : (
        <p className=" text-center m-4 font-semibold">No chat</p>
      )}
    </aside>
  );
};

export default ChatList;
