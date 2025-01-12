import { Wrench } from 'lucide-react'
import React from 'react'

function SideBar() {
    return (
        <>
            <aside className='hidden md:flex flex-col h-screen  w-64 bg-white border-r dark:bg-black dark:border-black'>
                <div className='h-full flex flex-col w-full'>

                    <nav className="space-y-2">
                        <div className="space-y-3">
                            <label className='px-3 flex gap-1 items-center text-xs text-black uppercase dark:text-white/50'>
                                Features <Wrench size={16} />
                            </label>
                            <hr />

                            <button>hii</button>

                        </div>

                    </nav>



                </div>
            </aside>
        </>
    )
}

export default SideBar