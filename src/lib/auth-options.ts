import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { demoPassword, demoUsers } from "@/lib/demo-users";

export const authOptions: NextAuthOptions = {
  secret:
    process.env.NEXTAUTH_SECRET ??
    process.env.AUTH_SECRET ??
    "link-life-local-development-secret",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (!email || password !== demoPassword) {
          return null;
        }

        return demoUsers.find((user) => user.email === email) ?? null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.picture = user.image;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.image = token.picture ?? session.user.image;
      }

      return session;
    },
  },
};
