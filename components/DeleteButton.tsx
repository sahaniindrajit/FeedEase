import { deleteProject } from '@/action/deleteProject';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function DeleteButton(projectId: { projectId: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleDelete = async () => {
        setLoading(true);
        const data = await deleteProject(projectId.projectId);
        if (data.success) {
            setLoading(false);
            router.refresh();
        } else {
            setLoading(false);
        }
    }

    return (
        <div>
            {loading ? (
                <button className="bg-red-500 rounded p-1 px-3 hover:bg-red-600"
                    disabled>
                    <Loader className="animate-spin" size={16} />
                </button>
            ) : (
                <button onClick={handleDelete} className="bg-red-500 rounded p-1 px-3 hover:bg-red-600">
                    Delete
                </button>
            )
            }

        </div>
    )
}

export default DeleteButton