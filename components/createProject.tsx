"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader, PlusSquareIcon, SquarePlus } from "lucide-react";
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import { createProject } from '@/action/createProject';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

export default function CreateProject() {
    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();

        const formData = {
            name,
            url,
            description
        }

        const data = await createProject(formData);

        if (data.success) {
            router.push(`/`);
            setName("");
            setUrl("");
            setDescription("");
            setLoading(false);
        }
        else {
            toast.error("Failed to create project 😢");
            setLoading(false);
        }

        setLoading(false)
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline"
                    >Create Project <SquarePlus size={16} />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Project</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className='grid gap-4'>

                        <div className='grid gap-4' >
                            <Label htmlFor='name'>Project Name:</Label>
                            <Input id='name'
                                placeholder='Enter Project Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className='grid gap-4'>
                            <Label htmlFor='url'>Project URL</Label>
                            <Input id='url'
                                placeholder='Enter Project url'
                                value={url}
                                onChange={(e) => setUrl(e.target.value)} />
                        </div>

                        <div className='grid gap-4'>
                            <Label htmlFor='desc'>Project Description</Label>
                            <Textarea
                                id="desc"
                                placeholder="Enter project description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <DialogFooter>
                            {loading ? (
                                <Button type="submit">
                                    <Loader size={16} className="animate-spin" />
                                </Button>
                            ) : (
                                <Button type="submit">
                                    Create Project
                                    <PlusSquareIcon size={16} className="ml-1" />
                                </Button>
                            )}

                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>

        </>
    )
}
