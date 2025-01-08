import { NextAuthOptions, DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
        } & DefaultSession["user"];
    }
}

export const authOptions: NextAuthOptions = {
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

