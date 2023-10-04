import { Request, Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { chatId, senderId, text } = req.body;


  try {
    const message = await prisma.message.create({
      data: {
        chatId: chatId,
        senderId: senderId,
        text: text,
      },
    });

    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
};

export const getMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { chatId } = req.params;

  try {
    const message = await prisma.message.findMany({
      where: {
        chatId: chatId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
};
