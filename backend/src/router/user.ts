import express from "express";

import {
  getUsers,
  register,
  login,
  findUser,
  profile
} from "../Controllers/userController";


import { isLogin } from "../middleware/passpostJWT";

const router = express.Router();

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/find/:id", findUser);
router.get("/me",isLogin, profile);

export default router;
