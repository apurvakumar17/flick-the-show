// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ title, genres, imageUrl }) => {
    return (
        <div className="p-6 bg-(--md-sys-color-surface-container-low) rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
            {/* Image */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full rounded-2xl bg-(--md-sys-color-surface-variant) h-100 object-cover" // fallback bg for empty img
            />

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-(--md-sys-color-on-surface) truncate">
                    {title}
                </h3>
                <p className="text-sm text-(--md-sys-color-on-surface-variant)">
                    {genres}
                </p>
            </div>
        </div>

    );
};

export default MovieCard;