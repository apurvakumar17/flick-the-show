// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ title, genres, imageUrl }) => {
    return (
        <div className="p-6 bg-[#ebebeb] rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
            {/* <div className="w-full rounded-2xl bg-red-600 h-100"></div> */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full rounded-2xl bg-red-600 h-100" // Adjust height as needed
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {title}
                </h3>
                <p className="text-sm text-gray-600">
                    {genres}
                </p>
            </div>
        </div>
    );
};

export default MovieCard;