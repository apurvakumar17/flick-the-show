import React, { useEffect, useState } from 'react';
import AddMovieModal from './AddMovieModal';
import { api } from "../services/api";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

// --- Mock Data ---
const initialRunningMovies = [
    { id: 1038392, title: "The Conjuring: Last Rites" },
    { id: 138843, title: "The Conjuring" },
    { id: 423108, title: "The Conjuring: The Devil Made Do It" },
    { id: 259693, title: "The Conjuring 2" },
    { id: 1359977, title: "Conjuring the Cult" },
    { id: 1201126, title: "Conjuring Kannappan" },
];

const MoviePosterCard = ({ movie }) => {
    const [poster, setPoster] = useState(null);

    useEffect(() => {
        const fetchPoster = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${API_KEY}`
                );
                const data = await res.json();
                if (data.poster_path) setPoster(IMAGE_BASE + data.poster_path);
                else setPoster(null);
            } catch (err) {
                console.error("Error fetching poster:", err);
                setPoster(null);
            }
        };

        fetchPoster();
    }, [movie.movieId]);

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete this running movie?\n\nMovie ID: ${movie.movieId}\nThis action cannot be undone.`
        );

        if (!confirmed) {
            return;
        }

        try {
            // Call the delete API
            await api.deleteMovie(movie._id);
            window.location.reload()

            console.log(`Successfully deleted running movie: ${movie.movieId}`);
        } catch (error) {
            console.error('Error deleting running movie:', error);
            // alert('Failed to delete the poster. Please try again.');
        }
    };

    const handlePosterClick = (e) => {
        // Prevent click when clicking on delete button
        if (e.target.closest('button')) {
            return;
        }
        
        if (movie.movieId) {
            window.open(`/movie/${movie.movieId}`, '_blank');
        }
    };

    return (
        <div
            style={{
                backgroundColor: "var(--md-sys-color-surface)",
                borderColor: "var(--md-sys-color-outline-variant)",
                color: "var(--md-sys-color-on-surface)",
                boxShadow: "0 4px 6px var(--md-sys-color-shadow)"
            }}
            className="group relative w-full rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl cursor-pointer"
            onClick={handlePosterClick}
        >
            {/* Poster Image */}
            <div className="aspect-[2/3] overflow-hidden">
                <img
                    src={poster || "https://placehold.co/300x450/9CA3AF/FFFFFF?text=Poster+Missing"}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Delete Button */}
            <button
                aria-label={`Remove ${movie.title}`}
                onClick={handleDelete}
                style={{
                    backgroundColor: "var(--md-sys-color-error)",
                    color: "var(--md-sys-color-on-error)"
                }}
                className="absolute top-2 right-2 p-2 rounded-full opacity-80 transition-opacity duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-error-container"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
            </button>

            {/* Movie Details */}
            <div className="p-3 text-center">
                <h3
                    style={{ color: "var(--md-sys-color-on-surface)" }}
                    className="text-sm font-semibold truncate"
                    title={movie.title}
                >
                    {movie.movieName}
                </h3>
                <p style={{ color: "var(--md-sys-color-on-surface-variant)" }} className="text-xs mt-1">
                    ID: {movie.movieId}
                </p>
            </div>
        </div>
    );
};

// Add New Movie Card
const AddMovieCard = ({ onOpen }) => {
    return (
        <button
            onClick={onOpen}
            aria-label="Add New Movie"
            style={{
                backgroundColor: "var(--md-sys-color-surface-variant)",
                color: "var(--md-sys-color-on-surface-variant)",
                borderColor: "var(--md-sys-color-outline)"
            }}
            className="hover:cursor-pointer w-full rounded-xl shadow-inner transition-all duration-300 flex flex-col items-center justify-center p-4 border-4 border-dashed transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-primary-container"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
        </button>
    );
};

// Main Component
export default function EditCurrentlyRunningMovies() {
    const [runningMovies, setRunningMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchRunningMovies = async () => {
            try {
                const data = await api.getMovies();
                setRunningMovies(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchRunningMovies();
    }, []);

    return (
        <div className="mt-6" style={{ color: "var(--md-sys-color-on-background)" }}>
            <h1
                style={{ color: "var(--md-sys-color-on-background)" }}
                className='text-2xl font-bold mb-8 text-left'
            >
                Currently Running Movies
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {runningMovies.map((movie) => (
                    <MoviePosterCard key={movie.id} movie={movie} />
                ))}
                <AddMovieCard onOpen={() => setIsModalOpen(true)} />
            </div>
            {/* Full-screen Modal */}
            <AddMovieModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
