import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

import { encryptPassword, comparePassword } from "../service/auth.service";

type Register = {
  email: string;
  username: string;
  password: string;
};
interface ResponseError extends Error {
  statusCode?: number;
}

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, username, password }: Register = req.body;

  // console.log(email, username,password)
  try {
    const existEmail = await prisma.users.findUnique({
      where: { email },
    });

    if (existEmail) {
      res.status(500).send("Email has already exist.");
    } else {
      const hashPassword = await encryptPassword(password);

      const user = await prisma.users.create({
        data: {
          email,
          username,
          password: hashPassword,
        },
      });

      res.json(user).status(201);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      const error: ResponseError = new Error("User not founded.");
      // console.log(error);
      error.statusCode = 400;
      throw error;
    } else {
      //do something...
      const checkPassword = await comparePassword(password, user.password);

      if (!checkPassword) {
        res.status(500).json({ error: "password not match." });
        return;
      }

      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findMany();
    // console.log(user);

    res.send(user).status(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

export const findUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      res.status(404).send("User not founded.");
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
