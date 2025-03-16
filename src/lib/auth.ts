// /auth.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { sendVerificationRequest } from "./sendVerificationRequest";
import { Role } from "@prisma/client";
import authConfig from "./auth.config";
import Resend from "next-auth/providers/resend";
import type { Provider } from "next-auth/providers";
import { prisma } from "./prisma";
//const prisma = new PrismaClient();

// Fonction pour générer un nom d'utilisateur aléatoire
const generateUsername = (): string => {
  // Préfixe "user" + 6 chiffres aléatoires pour atteindre 10 caractères
  const randomDigits = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
  return `user${randomDigits}`;
};

const providers: Provider[] = [
  Resend({
    from: "LyradCode <lyrad@resend.dev>",
    apiKey: process.env.AUTH_RESEND_KEY,
    async sendVerificationRequest(params) {
      await sendVerificationRequest(params);
    },
  }),
  ...authConfig.providers,
];
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    }
    return provider;
  })
  .filter((provider) => provider.id !== "resend");
export const {
  auth: baseAuth,
  handlers,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  providers: providers,
  pages: {
    signIn: "/sign-in",
    error: "/error",
    verifyRequest: "/verify-email",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "credentials") {
        if (profile && "email_verified" in profile && !profile.email_verified)
          return false;
        return true;
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }
      if (token.username && session.user) {
        session.user.username = token.username as string;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });
      if (!user) return token;

      token.role = user.role;
      token.username = user.username;

      return token;
    },
  },
  events: {
    
    createUser: async ({ user }) => {
      // Attribuer un nom d'utilisateur lors de la création du compte
      const username = generateUsername();
      await prisma.user.update({
        where: { id: user.id },
        data: { username },
      });
    },
  },
});
