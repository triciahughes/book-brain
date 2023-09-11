import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      firstName,
      lastName,
      email,
      passwordHash,
      hostGroups,
      memberships,
      comments,
    } = req.body;

    // Ensure the required fields are not undefined
    if (!firstName || !lastName || !email || !passwordHash) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    // const passwordHash = await someHashingFunction(password);

    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        passwordHash: passwordHash,
        hostGroups: hostGroups,
        memberships: memberships,
        comments: comments,
      },
    });

    return res.status(200).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
