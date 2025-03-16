import type { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

// On étend le type de la session de l'utilisateur
export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  username: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    username: string;
  }
}
