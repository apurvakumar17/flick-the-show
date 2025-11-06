// src/components/MovieCard.jsx
import React, { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
    const [poster, setPoster] = useState(null);
    
    // Add null/undefined check for movie prop
    if (!movie) {
        return null; // or return a loading placeholder
    }
    
    const handleClick = () => {
        if (movie.movieId) {
            window.open(`/movie/${movie.movieId}`, '_self');
        }
    };

    useEffect(() => {
        const fetchPoster = async () => {
            // Create AbortController for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout

            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${API_KEY}`,
                    { signal: controller.signal }
                );
                
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                
                const data = await res.json();
                if (data.poster_path) {
                    setPoster(IMAGE_BASE + data.poster_path);
                } else {
                    setPoster(null);
                }
            } catch (err) {
                // Handle network errors, timeouts, and other fetch errors gracefully
                if (err.name === 'AbortError') {
                    console.warn(`Poster fetch timeout for movie ${movie.movieId}`);
                } else if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
                    console.warn(`Network error fetching poster for movie ${movie.movieId}. This may be due to network restrictions.`);
                } else {
                    console.warn(`Error fetching poster for movie ${movie.movieId}:`, err.message);
                }
                setPoster(null); // Set to null to show fallback
            } finally {
                clearTimeout(timeoutId);
            }
        };

        if (movie.movieId) {
            fetchPoster();
        }
    }, [movie.movieId]);


    return (
        <div
            className="min-w-[300px] max-w-[300px] p-6 bg-(--md-sys-color-surface-container-low) rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={handleClick}
        >
            {/* Image */}
            <img
                src={poster}
                alt={movie.title}
                className="w-full rounded-2xl bg-(--md-sys-color-surface-variant) h-100 object-cover" // fallback bg for empty img
            />

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-(--md-sys-color-on-surface) truncate">
                    {movie.movieName}
                </h3>
                {/* <p className="text-sm text-(--md-sys-color-on-surface-variant)">
                    {movie.genres}
                </p> */}
            </div>
        </div>

    );
};

export default MovieCard;