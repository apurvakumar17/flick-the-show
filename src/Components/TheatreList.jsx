// src/components/TheatreList.jsx
import React from 'react';
import TheatreCard from './TheatreCard';

const TheatreList = () => {
    const theatres = [
        {
            id: 1,
            logoUrl: "http://googleusercontent.com/file_content/0", 
            theatreName: "INOX Janakpuri, Janak Place",
            location: "",
        },
        {
            id: 2,
            logoUrl: "http://googleusercontent.com/file_content/0",
            theatreName: "PVR Vegas, Dwarka",
            location: "",
        },
        {
            id: 3,
            logoUrl: "http://googleusercontent.com/file_content/0",
            theatreName: "M2K Rohini, Sec-3",
            location: "",
        },
        {
            id: 4,
            logoUrl: "http://googleusercontent.com/file_content/0",
            theatreName: "Cinepolis Unity One, Rohini",
            location: "",
        },
        {
            id: 5,
            logoUrl: "http://googleusercontent.com/file_content/0",
            theatreName: "Chand Miraj Cinemas, Mayur Vihar Phase 1",
            location: "",
        },
    ];

    return (
        <div className="mt-8 w-[90vw]">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Theatres near you</h2>
            <div className="space-y-4">
                {theatres.map((theatre) => (
                    <TheatreCard
                        key={theatre.id}
                        logoUrl={theatre.logoUrl}
                        theatreName={theatre.theatreName}
                        location={theatre.location}
                    />
                ))}
            </div>
        </div>
    );
};

export default TheatreList;