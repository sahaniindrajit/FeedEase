import React from 'react'

interface Project {
    params: { id: string }
}
const page = async ({ params }: Project) => {
    const { id } = await params
    return (
        <div>{id}</div>
    )
}

export default page