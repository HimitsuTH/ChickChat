import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { Icons } from "@/components/icons";

import ChatList from "./ChatList";

export const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className=" flex-row justify-between mt-2 h-5/6 md:h-5/6 md:flex  p-0 md:p-4  ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex justify-center items-center md:hidden ${isOpen ? "bg-slate-300 hover:bg-slate-800 transition-colors" : "bg-slate-800"} text-white rounded-full w-10 h-10 absolute z-[100] left-0 top-1/2 shadow-sm `}
      >
        {!isOpen ? <Icons.arrowRight className=" h-5 w-5"/> : <Icons.arrowLeft className=" h-5 w-5"/> }
      </button>
      <ChatList isOpen={isOpen} />
      <Outlet />
    </main>
  );
};
