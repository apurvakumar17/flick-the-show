import React from 'react'
import Navbar from '../Components/Navbar'

function AdminDashboard() {
    return (
        <div className='flex justify-center items-center flex-col px-4' >
            <Navbar></Navbar>
            <h1>Welcome to Admin Dashboard</h1>
        </div>
    )
}

export default AdminDashboard
