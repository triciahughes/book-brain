import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { bookId, promptStr } = req.body;

    if (!promptStr) {
      return res
        .status(400)
        .json({ error: "Required fields are missing. No discussion" });
    }
    const newPrompt = await prisma.prompt.create({
      data: {
        bookId: bookId,
        promptStr: promptStr,
      },
    });

    return res.status(200).json({ success: true, prompt: newPrompt });
  } catch (error) {
    console.error("Error creating prompt:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
