import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
// If you plan to hash passwords, import bcrypt or a similar library here.

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
      async authorize(credentials, req) {
        let user;
        try {
          // Ideally, here you should retrieve the user by email
          // Then compare hashed passwords using bcrypt or similar
          user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          // Using bcrypt as an example:
          // const isValidPassword = await bcrypt.compare(credentials.password, user?.password);
          // if (!isValidPassword) user = null;

          // The above code assumes you've stored the hashed password in the database.
        } catch (error) {
          console.error("Error during authentication:", error);
        } finally {
          await prisma.$disconnect(); // Disconnect prisma after using
        }

        return user || null;
      },
    }),
  ],
});
