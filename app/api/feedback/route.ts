import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"

const feedbackSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    feedback: z.string(),
    rating: z.number().int().min(1).max(5),
    projectId: z.string(),

})


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const validation = feedbackSchema.safeParse(data);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: validation.error
                },
                { status: 400 }
            )
        }

        const submitFeedback = await prisma.feedback.create({
            data: {
                name: validation.data.name,
                email: validation.data.email,
                feedback: validation.data.feedback,
                rating: validation.data.rating,
                projectId: validation.data.projectId
            }
        })

        console.log(submitFeedback)

        return NextResponse.json(
            {
                success: true,
                message: "Feedback received successfully",
            },
            { status: 200 }
        );
    }
    catch {
        return NextResponse.json(
            {
                success: false,
                error: "Failed to process feedback"
            },
            { status: 400 }
        );
    }
}