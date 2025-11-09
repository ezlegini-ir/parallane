import { database } from "@parallane/database";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getUserById } from "./data/user";

export default {
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  trustHost: true,
  events: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        await database.user.update({
          where: { id: +user.id! },
          data: { emailVerified: new Date() },
        });
      }

      if (account?.provider === "google" && !user.image && profile?.picture) {
        await database.user.update({
          where: { id: +user.id! },
          data: { image: profile.picture },
        });
      }

      if (account?.provider === "google" && profile?.locale) {
        const country = profile.locale.split("-")[1];

        await database.user.update({
          where: { id: +user.id! },
          data: { country: country },
        });
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const existingUser = await getUserById(+user.id!);
        if (!existingUser) return token;
        token.id = user.id;
        return token;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  providers: [
    Google({ allowDangerousEmailAccountLinking: true }),
    Credentials({
      id: "user-login",
      name: "User Login",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (!email || !password) {
          throw new Error("Please insert your credentials");
        }

        const user = await database.user.findFirst({
          where: { email: email.toLowerCase() },
        });
        if (!user) throw new Error("Invalid Credentials");

        if (!user.password) {
          throw new Error(
            "You need to sign in with Your Google account or reset your password."
          );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Invalid Credentials");

        return { id: user.id.toString() };
      },
    }),
  ],
} satisfies NextAuthConfig;
