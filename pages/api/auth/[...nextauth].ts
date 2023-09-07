import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (
            user &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            // Return user object if credentials are valid
            return { email: user.email, id: user.id, name: user.name }; // adjust the properties accordingly
          } else {
            return null; // Return null if credentials are invalid
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        } finally {
          await prisma.$disconnect(); // Disconnect prisma after using
        }
      },
    }),
  ],
});
