"use client";
import CreateProject from "@/components/createProject";
import Navbar from "@/components/navBar";
import ProjectCard from "@/components/ProjectCard";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Navbar />

      <ProjectCard name="kkk" url="fjfjjf" description="cxdfugfh" projectId="fdfdf" />
      <h1>hii</h1>
      <button onClick={() => signIn("google")}>
        login
      </button>
      <CreateProject />
    </>
  );
}
