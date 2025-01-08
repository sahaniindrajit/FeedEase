import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const nextAuth = NextAuth(authOptions)
const handlers = {
    GET: nextAuth,
    POST: nextAuth,
};

export const { GET, POST } = handlers;