import React from "react";
import { Outlet } from "react-router-dom";

// import ChatList from "@/components/chat/ChatList";

import Navbar from "@/components/Navbar";

const Chat = () => {
  // const { user, logout } = useAuth();
  return (
    <div className=" bg-slate-100 h-screen overflow-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Chat;
