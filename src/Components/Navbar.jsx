import React, { useState } from 'react'

function Navbar() {
    const [search, searchValue] = useState("");
    return (
        <div className='h-14 w-full bg-gray-300 mx-3.5 mt-3.5 rounded-2xl p-3 py-6 flex justify-between items-center'>
            <img src="/flick_t.png" className='h-14 mr-2'></img>
            <input
                type="text"
                placeholder="Search.."
                value={search}
                onChange={(e) => searchValue(e.target.value)}
                className=" border p-2 rounded-4xl sm:mx-6 md:mx-12 lg:mx-24 xl:mx-38 h-9 bg-white border-none sm:flex-1 px-5 w-[20vw]"
            />
            <div className='flex ml-2'>
                <button
                    // onClick={handleClick}
                    className="font-bold bg-(--md-sys-color-primary) text-white px-4 py-2 rounded-4xl hover:bg-blue-600 h-9 flex justify-center items-center mr-2"
                >
                    SignUp
                </button>
                <button
                    // onClick={handleClick}
                    className="font-bold bg-white border-(--md-sys-color-primary) text-(--md-sys-color-primary) px-4 py-2 rounded-4xl hover:bg-blue-600 h-9 flex justify-center items-center border-2"
                >
                    LogIn
                </button>
            </div>

        </div>
    )
}

export default Navbar
