import React, { useState } from 'react'

function Navbar() {
    const [search, searchValue] = useState("");
    return (
        <div className='h-14 w-full bg-gray-300 mx-3.5 mt-3.5 rounded-2xl p-3 py-6 flex justify-between items-center'>
            <img src="/flick_temp_logo.png" className='h-14'></img>
            <input
                type="text"
                placeholder="Type something..."
                value={search}
                onChange={(e) => searchValue(e.target.value)}
                className="border p-2 rounded-4xl"
            />
            <button
                // onClick={handleClick}
                className="bg-(--md-sys-color-primary) text-white px-4 py-2 rounded-4xl hover:bg-blue-600"
            >
                LogIn
            </button>
        </div>
    )
}

export default Navbar
