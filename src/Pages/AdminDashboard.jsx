import React from 'react'
import Navbar from '../Components/Navbar'
import { useAuth } from "../context/AuthContext";
import EditCarouselPosters from '../Components/EditCaraouselPosters';
import EditCurrentlyRunningMovies from '../Components/EditCurrentlyRunning';
import Footer from '../Components/Footer';

function AdminDashboard() {
    const { userData } = useAuth();

    return (
        <div className='flex justify-center items-center flex-col px-4 bg-(--md-sys-color-background)' >
            <Navbar></Navbar>
            <div className='container '>
                <div className='border-b border-[var(--md-sys-color-surface-container-high)]'>
                    <h1 className='text-3xl font-bold text-(--md-sys-color-on-background) my-3 text-left'>Welcome {userData?.name || "User"}</h1>
                </div>
                <EditCarouselPosters></EditCarouselPosters>
                <EditCurrentlyRunningMovies></EditCurrentlyRunningMovies>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default AdminDashboard
