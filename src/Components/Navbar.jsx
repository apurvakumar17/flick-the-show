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
        <div className='h-14 w-full bg-(--md-sys-color-surface-container) mx-3.5 mt-3.5 rounded-2xl p-3 py-6 flex justify-between items-center shadow-md'>
            {/* Logo */}
            <Link to="/" replace>
                <img src="/flick_t_dark.png" className='h-14 mr-2 hover:cursor-pointer' />
            </Link>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search.."
                value={search}
                onChange={(e) => searchValue(e.target.value)}
                className="transition delay-150 ease-in-out border-2 border-(--md-sys-color-outline) rounded-3xl sm:mx-6 md:mx-12 lg:mx-24 xl:mx-38 h-10 bg-(--md-sys-color-inverse-on-surface) text-(--md-sys-color-on-surface-variant) px-5 w-[25vw] placeholder-(--md-sys-color-on-surface-variant) font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-(--md-sys-color-primary)"
            />

            {/* <MdSearch className="text-(--md-sys-color-on-surface-variant) text-xl bg-(--md-sys-color-inverse-on-surface) h-10 w-10 p-2 rounded-full hover:cursor-pointer" /> */}
            
            {/* Auth Buttons */}
            {userLoggedIn ? (
                <div className="flex items-center space-x-2">
                    {role === "admin" && (
                        <Link to="/admin">
                            <button className="font-bold bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary) px-4 py-2 rounded-4xl hover:scale-110 transition duration-300 ease-in-out cursor-pointer h-9 flex justify-center items-center shadow-sm">
                                Admin Dashboard
                            </button>
                        </Link>
                    )}
                    <button
                        onClick={handleLogout}
                        className="font-bold bg-(--md-sys-color-surface-container-lowest) border-2 border-(--md-sys-color-primary) text-(--md-sys-color-primary) px-4 py-2 rounded-4xl hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer h-9 flex justify-center items-center shadow-sm"
                    >
                        LogOut
                    </button>
                </div>
            ) : (
                <div className='flex ml-2'>
                    <Link to="/signup" replace>
                        <button className="font-bold bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary) px-4 py-2 rounded-4xl hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer h-9 flex justify-center items-center mr-2 shadow-sm">
                            SignUp
                        </button>
                    </Link>

                    <Link to="/login" replace>
                        <button className="font-bold bg-(--md-sys-color-surface-container-lowest) border-2 border-(--md-sys-color-primary) text-(--md-sys-color-primary) px-4 py-2 rounded-4xl hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer h-9 flex justify-center items-center shadow-sm">
                            LogIn
                        </button>
                    </Link>
                </div>
            )}
        </div>

    );
}

export default Navbar;
