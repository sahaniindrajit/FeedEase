
import CreateProject from '@/components/createProject';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth'
import prisma from '@/lib/db';
import { PanelsTopLeft } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
    const session = await auth();

    if (!session) {
        redirect('/')
    }
    const email = session?.user?.email;
    if (!email) {
        throw new Error("User email is undefined");
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email
        },
    });

    const data = await prisma.project.findMany({
        where: {
            userId: currentUser?.id,
        },
    });

    return (

        <div className=' w-full min-h-[80vh]'>
            <div className='flex justify-between items-center py-3 px-5'>
                <h1 className='px-2 text-xl font-semibold md:text-3xl flex flex-row gap-1'>
                    Dashboard
                    <PanelsTopLeft size={30} />
                </h1>

                {data.length > 5 ? (
                    <Button disabled variant={"outline"}>
                        Limit Exceeded
                    </Button>
                ) : null}
            </div>


            <hr />

            <div className="p-3 flex flex-wrap gap-6">
                {data && data.length > 0 ? (
                    data.map((data, index) => (
                        <ProjectCard
                            key={index}
                            projectId={data.id}
                            name={data.name}
                            url={data.url}
                            description={data.description || ""}
                        />
                    ))
                ) : (
                    <div className="flex flex-col justify-center mx-auto gap-y-3">
                        <div className="text-center mt-3 w-full">No projects found 🥲</div>
                        <CreateProject />
                    </div>
                )}
            </div>

        </div>


    )
}

export default Page;