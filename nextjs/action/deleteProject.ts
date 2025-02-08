"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export const deleteProject = async (projectId: string) => {
    try {
        const user = await auth();

        if (!user?.user?.email) {
            return { success: false, error: "User not authenticated" };
        }

        const userRecord = await prisma.user.findUnique({
            where: {
                email: user.user.email,
            },
            select: {
                id: true,
            },
        });

        if (!userRecord?.id) {
            return { success: false, error: "User ID not found" };
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: userRecord.id,
            },
        });

        if (!project) {
            return { success: false, error: "Project not found" };
        }

        await prisma.project.delete({
            where: {
                id: projectId,
            },
        });


        return { success: true };
    } catch (error) {
        console.error("Error deleting project: ", error);
        return { success: false, error: "Error deleting project" };
    }
};