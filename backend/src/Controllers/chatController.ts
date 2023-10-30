import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ResponseError extends Error {
  statusCode?: number;
}

//Create Chat
export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, recipientId } = req.body;
  //   console.log(firstId, secondId);

  try {
    const exitsUser = await prisma.users.findMany({
      where: {
        id: {
          in: [userId, recipientId],
        },
      },
    });
    // console.log("======================================================")
    // Check if the user exists
    if (exitsUser.length < 2) {
      const error: ResponseError = new Error("Some users are missing.");
      error.statusCode = 401;
      throw error;
    }

    const chatIsExist = await prisma.chat.findFirst({
      where: {
        members: {
          every: {
            userId: {
              in: [userId, recipientId],
            },
          },
        },
      },
    });

    if (chatIsExist) {
      const error: ResponseError = new Error("Chat has already exist.");
      error.statusCode = 401;
      throw error;
    }

    const chatBox = await prisma.chat.create({
      data: {
        members: {
          create: [{ userId: userId }, { userId: recipientId }],
        },
      },
      include: {
        members: true,
      },
    });

    res.status(200).json(chatBox);
  } catch (err) {
    next(err);
  }
};

export const findUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const chatBox = await prisma.chat.findMany({
      where: {
        members: {
          some: {
            userId: id,
          },
        },
      },
      include: {
        members: {
          select: {
            userId: true,
          },
        },
      },
    });

    res.status(200).json(chatBox);
  } catch (err) {
    next(err);
  }
};

export const findChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { chatId } = req.params;

  try {
    const chatBox = await prisma.chat.findFirst({
      where: {
        id: chatId,
      },
      include: {
        members: true,
      },
    });

    if (!chatBox) {
      const error: ResponseError = new Error("Chat box not founded.");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(chatBox);
  } catch (err) {
    next(err);
  }
};
