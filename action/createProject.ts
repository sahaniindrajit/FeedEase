"use server"
import prisma from "@/lib/db";
import { Project } from "@/types/project.types";
import { auth } from "@/lib/auth";
import { z } from "zod";

const projectSchema = z.object({
    name: z.string(),
    desc: z.string().optional(),
    url: z.string().url()
})

export const createProject = async (projectData: Project) => {

    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
        throw new Error("User email is undefined");
    }

    const findUser = await prisma.user.findUnique({
        where: { email }
    });


    const projects = await prisma.project.findMany({
        where: {
            userId: findUser?.id
        }
    })

    if (projects.length >= 5) {
        console.log("Maximum project limit reached");
        return { success: false };
    }
    try {
        const data = projectSchema.safeParse({
            name: projectData.name,
            url: projectData.url,
            desc: projectData.desc
        })
        if (!data.success) {
            console.log("Invalid data");
            throw new Error("Invalid data");
        }
        if (!findUser?.id) {
            console.log("User not found");
            throw new Error("User not found");
        }

        const createProject = await prisma.project.create({
            data: {
                name: data.data.name,
                description: data.data.desc,
                url: data.data.url,
                userId: findUser.id
            }
        })

        if (!createProject) {
            console.log("Failed to save data");
            throw new Error("Failed to save data");
        }

        console.log("Project saved:", createProject);

        return { success: true, projectId: createProject.id };

    }
    catch (error) {
        console.log("Error:", error);
        return { success: false };
    }
}