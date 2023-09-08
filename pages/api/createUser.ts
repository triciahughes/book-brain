import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      hostGroups,
      memberships,
      comments,
    } = req.body;

    // Ensure the required fields are not undefined
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    // If you're hashing the password before saving it
    // const passwordHash = await someHashingFunction(password);

    const newUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        passwordHash: password,
        // Add other fields if necessary
      },
    });

    return res.status(200).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};
