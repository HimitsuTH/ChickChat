import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/context/ChatContext";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCurrentChat } = useChat();
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between gap-x-2 py-2 px-10 bg-white shadow items-center">
      <h1
        className=" cursor-pointer font-extrabold text-xl  p-2 "
        onClick={() => {
          localStorage.removeItem("currentChat")
          navigate("/");
        }}
      >
        ChickChat
      </h1>
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className=" flex flex-row gap-2 justify-between items-center p-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{user?.email}</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className=" cursor-default">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <Link to={"/auth"} onClick={() => {
              getCurrentChat(null);
              logout() 
            }}>
              <DropdownMenuItem className=" cursor-pointer">
                Logout
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
