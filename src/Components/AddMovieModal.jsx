import React, { useState } from 'react';
import { api } from "../services/api";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function convertToEmbedUrl(urlString) {
    try {
        if (urlString.includes("youtu.be/")) {
            const videoIdMatch = urlString.match(/(?:youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
            if (videoIdMatch && videoIdMatch[1]) {
                return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
            }
        }

        const url = new URL(urlString);
        if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
            const videoId = url.searchParams.get('v');
            if (videoId) return `https://www.youtube.com/embed/${videoId}`;
        }

        const pathParts = url.pathname.split('/');
        const lastPart = pathParts[pathParts.length - 1];
        if (lastPart.length === 11) return `https://www.youtube.com/embed/${lastPart}`;

        return null;
    } catch {
        return null;
    }
}

const AddMovieModal = ({ isOpen, onClose }) => {
    const [trailerUrl, setTrailerUrl] = useState("");
    const [movieName, setMovieName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    if (!isOpen) return null;

    const handleSearch = async () => {
        if (!movieName.trim()) return;
        setLoading(true);
        try {
            const res = await fetch(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(movieName)}`
            );
            const data = await res.json();
            setSearchResults(data.results || []);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
            <div
                className="h-[90%] w-[90%] md:w-[80%] rounded-2xl p-6 md:p-8 pb-0 shadow-2xl relative overflow-auto"
                style={{
                    backgroundColor: "var(--md-sys-color-surface-container-highest)",
                    color: "var(--md-sys-color-on-surface)"
                }}
            >
                {/* Top Section */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left column */}
                    <div className="md:w-1/2 w-full">
                        <h2 className="text-lg md:text-xl font-bold mb-4">
                            Add New Movie
                        </h2>

                        {/* Trailer URL */}
                        <input
                            type="text"
                            placeholder="Enter trailer link"
                            className="w-full p-3 mb-4 rounded-full border text-sm md:text-base"
                            style={{
                                backgroundColor: "var(--md-sys-color-surface-container)",
                                color: "var(--md-sys-color-on-surface)",
                                borderColor: "var(--md-sys-color-outline)"
                            }}
                            value={trailerUrl}
                            onChange={(e) => setTrailerUrl(e.target.value)}
                        />

                        {/* Movie name + buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Enter movie name"
                                className="flex-1 p-3 rounded-full border text-sm md:text-base"
                                style={{
                                    backgroundColor: "var(--md-sys-color-surface-container)",
                                    color: "var(--md-sys-color-on-surface)",
                                    borderColor: "var(--md-sys-color-outline)"
                                }}
                                value={movieName}
                                onChange={(e) => setMovieName(e.target.value)}
                            />
                            <button
                                className="px-5 py-3 rounded-full w-full sm:w-auto hover:scale-[1.02] transition hover:cursor-pointer"
                                style={{
                                    backgroundColor: "var(--md-sys-color-primary)",
                                    color: "var(--md-sys-color-on-primary)"
                                }}
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                            <button
                                className="px-5 py-3 rounded-full w-full sm:w-auto hover:scale-[1.02] transition hover:cursor-pointer"
                                style={{
                                    backgroundColor: "var(--md-sys-color-surface-variant)",
                                    color: "var(--md-sys-color-on-surface-variant)"
                                }}
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    {/* Right column - Trailer Preview */}
                    {trailerUrl && (
                        <div className="md:w-1/2 w-full flex justify-center md:justify-start">
                            <iframe
                                className="w-full md:w-[80%] aspect-video rounded-xl mt-4 md:mt-0"
                                src={convertToEmbedUrl(trailerUrl)}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>

                {/* Search Results */}
                <div
                    className="mt-6 h-[43vh] md:h-[56%] rounded-2xl p-4 overflow-x-auto"
                    style={{
                        backgroundColor: "var(--md-sys-color-surface-variant)",
                        color: "var(--md-sys-color-on-surface-variant)"
                    }}
                >
                    {loading && <p className="text-center">Loading...</p>}
                    {!loading && searchResults.length === 0 && (
                        <p className="text-center">No results</p>
                    )}

                    <div className="flex space-x-3 md:space-x-4">
                        {searchResults.map((movie) => {
                            const isSelected = selectedMovie?.id === movie.id;
                            return (
                                <div
                                    key={movie.id}
                                    onClick={() => setSelectedMovie(movie)}
                                    className={`rounded-lg shadow p-2 text-center flex-shrink-0 w-28 md:w-40 cursor-pointer transition-all ${
                                        isSelected
                                            ? "border-4 border-[var(--md-sys-color-primary)] scale-105"
                                            : "border-0"
                                    }`}
                                    style={{
                                        backgroundColor: "var(--md-sys-color-surface)",
                                        color: "var(--md-sys-color-on-surface)"
                                    }}
                                >
                                    {movie.poster_path ? (
                                        <img
                                            src={IMAGE_BASE + movie.poster_path}
                                            alt={movie.title}
                                            className="rounded-md w-full h-40 md:h-60 object-cover"
                                        />
                                    ) : (
                                        <div className="h-40 md:h-60 flex items-center justify-center rounded-md bg-gray-200 text-gray-500">
                                            No Image
                                        </div>
                                    )}
                                    <h3 className="mt-2 font-semibold text-xs md:text-sm truncate">
                                        {movie.title}
                                    </h3>
                                    <p className="text-[10px] md:text-xs text-gray-500">
                                        ID: {movie.id}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-row-reverse mt-4">
                    <button
                        className="px-6 py-3 rounded-full w-full md:w-[25%] hover:cursor-pointer transition"
                        style={{
                            backgroundColor: "var(--md-sys-color-primary)",
                            color: "var(--md-sys-color-on-primary)"
                        }}
                        onClick={async () => {
                            if (!selectedMovie) {
                                alert("Please select a movie first");
                                return;
                            }
                            if (!trailerUrl.trim()) {
                                alert("Please enter a trailer URL");
                                return;
                            }

                            try {
                                const data = {
                                    movieName: selectedMovie.title || selectedMovie.original_title,
                                    movieId: selectedMovie.id,
                                    movieTrailer: trailerUrl
                                };

                                console.log("Submitting data:", data);
                                onClose();
                                const result = await api.addMovie(data);
                                console.log("Success:", result);

                                setSelectedMovie(null);
                                setTrailerUrl("");
                                setMovieName("");
                                setSearchResults([]);
                            } catch (error) {
                                console.error("Error adding movie:", error);
                            }
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddMovieModal;
