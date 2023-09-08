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
              passwordHash: credentials.password,
            },
          });

          if (user) {
            // Return user object if found
            // console.log(user);
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
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signin",
  },
});
