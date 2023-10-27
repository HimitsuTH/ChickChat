import express from "express";
const router = express.Router();
import { createChat, findUserChats, findChat } from "../Controllers/chatController";

router.post("/", createChat);
router.get("/user/:id", findUserChats);
router.get("/chatId=:chatId", findChat);

export default router;
