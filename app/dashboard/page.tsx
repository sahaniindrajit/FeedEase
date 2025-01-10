
import { auth } from '@/lib/auth'
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
    const session = await auth();

    if (!session?.user) {
        redirect('/')
    }
    const email = session?.user?.email;
    if (!email) {
        throw new Error("User email is undefined");
    }

    const findUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    return (
        <div>Dashboard</div>
    )
}

export default Page;