import React from 'react'
import Navbar from '../Components/Navbar'
import PreviousBookings from '../Components/PreviousBookings'
import ActiveTickets from '../Components/ActiveTickets'
import { useAuth } from "../context/AuthContext";
import Footer from '../Components/Footer';

function UserDashboard() {
    const { userData } = useAuth();

    return (
        <div className='flex justify-center items-center flex-col px-4  bg-(--md-sys-color-background)' >
            <Navbar></Navbar>
            <div className='container '>
                <div className='border-b border-[var(--md-sys-color-surface-container-high)]'>
                    <h1 className='text-3xl font-bold text-(--md-sys-color-on-background) my-3 text-left'>Welcome {userData?.name || "User"}</h1>
                </div>
                <PreviousBookings></PreviousBookings>
                <ActiveTickets></ActiveTickets>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default UserDashboard
