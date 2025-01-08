"use client";
import CreateProject from "@/components/createProject";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <>
      <h1>hii</h1>
      <button onClick={() => signIn("google")}>
        login
      </button>
      <CreateProject />
    </>
  );
}
