import React from 'react'
import CreateProject from './createProject'

function Navbar() {
    return (
        <div className='w-2 bg-'>
            <nav className='flex justify-between'>
                <div> FeedEase</div>


                <CreateProject />
            </nav>
        </div>
    )
}

export default Navbar