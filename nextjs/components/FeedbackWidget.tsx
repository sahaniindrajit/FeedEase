"use client"

import type React from "react"
import { useState } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface FeedbackWidgetProps {
    websiteName: string
    projectId: string
}

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ websiteName, projectId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [rating, setRating] = useState(0)
    const [feedback, setFeedback] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch("api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, rating, feedback, projectId, websiteName }),
            })
            const data = await response.json()
            if (data.success) {
                toast({
                    title: "Success!",
                    description: "Feedback submitted successfully!",
                })
                setIsOpen(false)
                setName("")
                setEmail("")
                setRating(0)
                setFeedback("")
            } else {
                throw new Error(data.error || "Failed to submit feedback")
            }
        } catch () {
            toast({
                title: "Error",
                description: "Failed to submit feedback. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {!isOpen ? (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full w-12 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    <MessageSquare className="w-6 h-6" />
                    <span className="sr-only">Open Feedback</span>
                </Button>
            ) : (
                <Card className="w-96 shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-2xl font-bold">Provide Feedback</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Rating</Label>
                                <div className="flex justify-between">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Button
                                            key={star}
                                            type="button"
                                            variant={rating >= star ? "default" : "outline"}
                                            className="w-10 h-10 p-0"
                                            onClick={() => setRating(star)}
                                        >
                                            ★
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="feedback">Feedback</Label>
                                <Textarea
                                    id="feedback"
                                    placeholder="Your feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    required
                                    className="min-h-[100px]"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Submit Feedback
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default FeedbackWidget

