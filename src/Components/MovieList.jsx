// src/components/MovieList.jsx
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard'; // Make sure the path is correct
import { api } from "../services/api";

const MovieList = () => {
    const [loading, setLoading] = useState(true);
    const [movielist, setmovielist] = useState([]);
    // Sample data for movies (replace with actual data from an API or prop)
    
    
    const movies = [
        {
            id: 1,
            movieId: 24428, // TMDB ID for The Avengers (example)
            title: "Mahavatar Narsimha",
            genres: "Action/Animation/Drama",
            imageUrl: "/cards/mnarsimha_card.jpg", // This would be your local path or a CDN link
        },
        {
            id: 2,
            movieId: 24428, // TMDB ID for The Avengers (example)
            title: "War 2",
            genres: "Action/Thriller",
            imageUrl: "/cards/war2_card.jpg",
        },
        {
            id: 3,
            movieId: 24428, // TMDB ID for The Avengers (example)
            title: "2.0",
            genres: "Action/Thriller",
            imageUrl: "/cards/robot2_card.jpg",
        },
        {
            id: 4,
            movieId: 24428, // TMDB ID for The Avengers (example)
            title: "Captain America B...",
            genres: "Action/Thriller/Comic",
            imageUrl: "/cards/capbrave_card.jpg",
        },
        // Add more movie objects as needed
    ];

    useEffect(() => {
            const fetchMovies = async () => {
                try {
                    setLoading(true);
                    const data = await api.getMovies();
                    setmovielist(data);
                    console.log('Running Movie data:', data); // Debug log
                } catch (error) {
                    console.error('Error fetching movies:', error);
                } finally {
                    setLoading(false);
                }
            };
    
            fetchMovies();
        }, []);

    return (
        <div className="container mx-auto px-4 py-8 bg-(--md-sys-color-background)">
            <h2 className="text-3xl font-bold text-(--md-sys-color-on-background) mb-6">
                Currently Screening
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movielist.map((item) => (
                    <MovieCard
                        movie={item}
                    />
                ))}
            </div>
        </div>


    );
};

export default MovieList;