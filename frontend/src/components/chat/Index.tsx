import React from "react";
import { Outlet } from "react-router-dom";

import ChatList from "./ChatList";

export const Index = () => {
  return (
    <main className=" flex-row justify-between mt-2 h-3/4 md:h-5/6 md:flex ">
      <ChatList />

      <Outlet />
    </main>
  );
};
