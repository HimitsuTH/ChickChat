import React from "react";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const { chatId } = useParams();


  return <div className=" flex-1 bg-white ml-2 h-full shadow rounded overflow-y-scroll">ChatBox {chatId}</div>;
};

export default ChatBox;
