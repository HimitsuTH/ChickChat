import express from "express";

import {
  getUsers,
  register,
  login,
  findUser,
} from "../Controllers/userControllers";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/:id", findUser);

export default router;
