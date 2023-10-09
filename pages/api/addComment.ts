import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { promptId, commentStr, userId } = req.body;

    if (!commentStr) {
      return res
        .status(400)
        .json({ error: "Required fields are missing. No comment." });
    }

    const newComment = await prisma.comment.create({
      data: {
        promptId: promptId,
        userId: userId,
        comment: commentStr,
      },
    });
    return res.status(200).json({ success: true, comment: newComment });
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
