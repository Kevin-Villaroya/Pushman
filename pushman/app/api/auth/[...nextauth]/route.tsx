import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import  { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if(!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

                if(!passwordMatch) {
                    return null;
                }

                return user;
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
    pages: {
        signIn: "/login",
        signOut: "/",
        error: "/login",
        register: "/register",
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};