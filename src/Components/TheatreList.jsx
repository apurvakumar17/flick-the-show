// src/components/TheatreList.jsx
import React from 'react';
import TheatreCard from './TheatreCard';

const TheatreList = () => {
    const theatres = [
        {
            id: 1,
            logoUrl: "/Theatre Logo/inox.png",
            theatreName: "INOX Janakpuri, Janak Place",
            location: "",
        },
        {
            id: 2,
            logoUrl: "/Theatre Logo/pvr.png",
            theatreName: "PVR Vegas, Dwarka",
            location: "",
        },
        {
            id: 3,
            logoUrl: "/Theatre Logo/m2k.png",
            theatreName: "M2K Rohini, Sec-3",
            location: "",
        },
        {
            id: 4,
            logoUrl: "/Theatre Logo/cinepolis.png",
            theatreName: "Cinepolis Unity One, Rohini",
            location: "",
        },
        {
            id: 5,
            logoUrl: "/Theatre Logo/miraj.png",
            theatreName: "Chand Miraj Cinemas, Mayur Vihar Phase 1",
            location: "",
        },
    ];

    return (
        <div className="mt-8 w-[90vw] bg-(--md-sys-color-background)">
            <h2 className="text-3xl font-bold text-(--md-sys-color-on-background) mb-6">
                Theatres near you
            </h2>

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