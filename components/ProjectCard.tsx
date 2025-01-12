import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
    name: string
    url: string
}

export default function ProjectCard({ name, url }: ProjectCardProps) {
    return (
        <Card className="flex flex-col justify-between h-full">
            <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">{name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{url}</p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">View</Button>
            </CardFooter>
        </Card>
    )
}

