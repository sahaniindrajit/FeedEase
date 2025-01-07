import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    pages: {
        error: "/",
        signIn: "/",
        signOut: "/",
    },
    session: {
        strategy: "jwt",
    }
};

const nextAuth = NextAuth(authOptions);

export const handlers = {
    GET: nextAuth,
    POST: nextAuth,
};

export const { auth, signIn, signOut } = nextAuth;
