import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { promptId, comment, userId } = req.body;

    // Validate the essential fields
    if (!comment || !userId || !promptId) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    // Prepare data for the create method
    const data: any = {
      comment: comment,
    };

    // If promptId is present, connect the comment to the prompt
    if (promptId) {
      data.prompt = {
        connect: { id: promptId },
      };
    }

    // Connect the comment to the user
    if (userId) {
      data.user = {
        connect: { id: userId },
      };
    }

    // Create the comment and connect it to the user and potentially the prompt
    const newComment = await prisma.comment.create({
      data: data,
    });

    return res.status(200).json({ success: true, comment: newComment });
  } catch (error: any) {
    console.error("Error creating comment:", error);
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${error.message}` });
  }
};
