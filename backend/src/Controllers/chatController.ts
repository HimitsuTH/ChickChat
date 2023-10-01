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
  const { firstId, secondId } = req.body;
  //   console.log(firstId, secondId);

  try {
    const chatIsExist = await prisma.chat.findFirst({
      where: {
        AND: [
          {
            members: {
              some: {
                userId: firstId,
              },
            },
          },
          {
            members: {
              some: {
                userId: secondId,
              },
            },
          },
        ],
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
          create: [{ userId: firstId }, { userId: secondId }],
        },
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
  const { firstId, secondId } = req.params;

  try {
    const chatBox = await prisma.chat.findFirst({
      where: {
        AND: [
          {
            members: {
              some: {
                userId: firstId,
              },
            },
          },
          {
            members: {
              some: {
                userId: secondId,
              },
            },
          },
        ],
      },
    });

    if(!chatBox){
        const error:ResponseError = new Error("Chat box not founded.");
        error.statusCode = 400
        throw error
    }

    res.status(200).json(chatBox)

  } catch (err) {
    next(err);
  }
};
