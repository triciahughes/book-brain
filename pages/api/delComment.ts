import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.body;

    // Validate the essential fields
    if (!id) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    // Delete the comment
    const deletedComment = await prisma.comment.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ success: true, comment: deletedComment });
  } catch (error: any) {
    console.error("Error deleting comment:", error);
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${error.message}` });
  }
};
