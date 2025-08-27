// src/components/TheatreCard.jsx
import React from 'react';

const TheatreCard = ({ logoUrl, theatreName, location }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-200 rounded-lg shadow-md mb-4 w-full">
            <div className="flex items-center">
                <img src={logoUrl} alt={`${theatreName} logo`} className="h-8 mr-4" />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{theatreName}</h3>
                    <p className="text-sm text-gray-600">{location}</p>
                </div>
            </div>
            <button className="bg-(--md-sys-color-primary) text-white font-bold py-2 px-6 rounded-full transition-colors duration-300">
                Book Seats
            </button>
        </div>
    );
};

export default TheatreCard;