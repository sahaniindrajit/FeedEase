"use client";
import CreateProject from "@/components/createProject";
import Navbar from "@/components/navBar";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Navbar />
      <h1>hii</h1>
      <button onClick={() => signIn("google")}>
        login
      </button>
      <CreateProject />
      <ThemeSwitch />
    </>
  );
}
