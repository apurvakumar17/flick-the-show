// src/components/MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard'; // Make sure the path is correct

const MovieList = () => {
    // Sample data for movies (replace with actual data from an API or prop)
    const movies = [
        {
            id: 1,
            title: "Mahavatar Narsimha",
            genres: "Action/Animation/Drama",
            imageUrl: "/cards/mnarsimha_card.jpg", // This would be your local path or a CDN link
        },
        {
            id: 2,
            title: "War 2",
            genres: "Action/Thriller",
            imageUrl: "/cards/war2_card.jpg",
        },
        {
            id: 3,
            title: "2.0",
            genres: "Action/Thriller",
            imageUrl: "/cards/robot2_card.jpg",
        },
        {
            id: 4,
            title: "Captain America B...",
            genres: "Action/Thriller/Comic",
            imageUrl: "/cards/capbrave_card.jpg",
        },
        // Add more movie objects as needed
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Currently Screening</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        genres={movie.genres}
                        imageUrl={movie.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieList;