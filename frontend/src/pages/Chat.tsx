import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Chat = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      Chat, {user?.email}
      <Link to={"/auth"} onClick={() => logout()}>
        <Button>Logout</Button>
      </Link>
    </div>
  );
};

export default Chat;
