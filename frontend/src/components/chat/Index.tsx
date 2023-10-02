import React from "react";
import { Outlet } from "react-router-dom";

import ChatList from "./ChatList";

export const Index = () => {
  return (
    <main className="flex flex-row justify-between mt-2 h-5/6 ">
      <ChatList />

      <Outlet />

      
    </main>
  );
};
