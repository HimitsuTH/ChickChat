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
  field?: string;
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
      const error: ResponseError = new Error("Email has already exist.");
      error.field = "email";
      error.statusCode = 400;
      throw error;
    } else {
      const hashPassword = await encryptPassword(password);

      const user = await prisma.users.create({
        data: {
          email,
          username,
          password: hashPassword,
        },
      });

      res.status(201).json(user);
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
      const error: ResponseError = new Error("Email not founded.");
      error.field = "email";
      error.statusCode = 404;
      throw error;
    } else {
      //do something...
      const checkPassword = await comparePassword(password, user.password);

      if (!checkPassword) {
        const error: ResponseError = new Error(
          "The password is incorrect. Try again."
        );
        error.field = "password";
        error.statusCode = 500;
        throw error;
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
  

      const error: ResponseError = new Error(
        "User not founded."
      );
      error.field = "not found";
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
