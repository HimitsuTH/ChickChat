import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { encryptPassword, comparePassword } from "../service/auth.service";

type TUser = {
  email: string;
  username: string;
  password: string;
};

interface TRegister extends TUser {
  password: string;
}

interface ResponseError extends Error {
  statusCode?: number;
  field?: string;
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password }: TUser = req.body;

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

      await prisma.users.create({
        data: {
          email,
          username,
          password: hashPassword,
        },
      });

      res.status(201).send("Register successfully.");
    }
  } catch (err) {
    next(err);
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

      const token = jwt.sign(
        {
          id: user.id,
        },
        "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.he0ErCNloe4J7Id0Ry2SEDg09lKkZkfsRiGsdX_vgEg",
        {
          expiresIn: "5 days",
        }
      );

      const expires_in = jwt.decode(token);

      console.log(token);

      console.log(expires_in);

      res.status(200).json(user);
    }
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.users.findMany();
    res.send(user).status(200);
  } catch (err) {
    next(err);
  }
};

export const findUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      const error: ResponseError = new Error("User not founded.");
      error.field = "not found";
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email } = req.user as TUser;

  res.status(200).json({
    username,
    email,
  });
};
