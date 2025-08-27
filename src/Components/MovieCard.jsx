// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ title, genres, imageUrl }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img
                src={imageUrl}
                alt={title}
                className="w-full rounded-2xl" // Adjust height as needed
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