import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      // ... other config
      async authorize(credentials) {
        try {
          // Query for the user by email and plain-text password
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
              passwordHash: credentials.password, // assuming 'passwordHash' is the field name in your Prisma model
            },
          });

          if (user) {
            // Return user object if found
            return {
              email: user.email,
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
            };
          } else {
            return null; // Return null if no user is found with those credentials
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
  session: {
    jwt: true, // using JSON web tokens
    maxAge: 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: "/signin", // Use custom sign-in page
    // ... potentially other pages
  },
});
