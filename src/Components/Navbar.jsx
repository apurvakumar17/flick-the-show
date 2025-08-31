import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const [search, searchValue] = useState("");
    const { userLoggedIn, logout, user, role } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className='h-14 w-full bg-gray-300 mx-3.5 mt-3.5 rounded-2xl p-3 py-6 flex justify-between items-center'>
            <Link to="/" replace>
                <img src="/flick_t.png" className='h-14 mr-2 hover:cursor-pointer' />
            </Link>

            <input
                type="text"
                placeholder="Search.."
                value={search}
                onChange={(e) => searchValue(e.target.value)}
                className="border p-2 rounded-4xl sm:mx-6 md:mx-12 lg:mx-24 xl:mx-38 h-9 bg-white border-none sm:flex-1 px-5 w-[20vw]"
            />

            {userLoggedIn ? (
                <div className="flex items-center space-x-2">
                    {role === "admin" && (
                        <Link to="/admin">
                            <button className="font-bold bg-(--md-sys-color-primary) text-white px-4 py-2 rounded-4xl hover:scale-110 transition duration-300 ease-in-out cursor-pointer h-9 flex justify-center items-center">
                                Admin Dashboard
                            </button>
                        </Link>
                    )}
                    <button
                        onClick={handleLogout}
                        className="font-bold bg-white border-(--md-sys-color-primary) text-(--md-sys-color-primary) px-4 py-2 rounded-4xl hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer h-9 flex justify-center items-center border-2"
                    >
                        LogOut
                    </button>
                </div>
            ) : (
                <div className='flex ml-2'>
                    <Link to="/signup" replace>
                        <button className="font-bold bg-(--md-sys-color-primary) text-white px-4 py-2 rounded-4xl hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer h-9 flex justify-center items-center mr-2">
                            SignUp
                        </button>
                    </Link>

                    <Link to="/login" replace>
                        <button className="font-bold bg-white border-(--md-sys-color-primary) text-(--md-sys-color-primary) px-4 py-2 rounded-4xl hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer h-9 flex justify-center items-center border-2">
                            LogIn
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Navbar;
