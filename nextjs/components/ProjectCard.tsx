import Link from "next/link"
import DeleteButton from "./DeleteButton"

interface ProjectCardProps {
    name: string
    projectId: string
    description: string
    url: string
}

export default function ProjectCard({ name, projectId, description, url }: ProjectCardProps) {
    return (
        <div className="w-full md: max-w-72 flex flex-col border border-gray-50 rounded ">
            <div className="text-md block p-2">
                {name}
            </div>
            <hr />
            <Link
                href={url}
                target="_black"
                className="text-xs text-blue-500 font-light p-2">
                {url.length > 35 ? `${url.slice(0, 35)}...` : url}
            </Link>

            <div className="block text-xs text-white/70 font-light p-2">
                {description.length > 40
                    ? `${description.slice(0, 40)}...`
                    : description}
            </div>

            <div className="w-full flex gap-2 m-2">
                <button className="bg-slate-400 rounded p-1 px-3 hover:bg-slate-500">
                    <Link href={`/dashboard/feedbacks/${projectId}`}>View</Link>
                </button>

                <DeleteButton projectId={projectId} />
            </div>

        </div>
    )
}

