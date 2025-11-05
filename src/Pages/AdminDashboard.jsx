import React from 'react'
import Navbar from '../Components/Navbar'
import { useAuth } from "../context/AuthContext";
import EditCarouselPosters from '../Components/EditCaraouselPosters';
import EditCurrentlyRunningMovies from '../Components/EditCurrentlyRunning';
import Footer from '../Components/Footer';
import { api } from '../services/api';

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
                <div className='mt-8 pb-6 border-b' style={{ borderColor: 'var(--md-sys-color-surface-container-high)' }}>
                    <h2 className='text-xl font-semibold mb-3 text-left text-(--md-sys-color-on-background)'>Theatre Maintenance</h2>
                    <button
                        onClick={async () => {
                            try {
                                const res = await api.resetTheatres();
                                const count = Array.isArray(res) ? res.length : undefined;
                                alert(count ? `Theatres reset: ${count}` : 'Theatre reset completed');
                            } catch (e) {
                                console.error(e);
                                alert('Failed to reset theatres');
                            }
                        }}
                        className='px-4 py-2 rounded-lg'
                        style={{ background: 'var(--md-sys-color-error)', color: 'var(--md-sys-color-on-error)' }}
                    >
                        Reset All Theatres
                    </button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default AdminDashboard
