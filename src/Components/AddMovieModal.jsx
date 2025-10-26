import React, { useState } from 'react';
import { api } from "../services/api";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // store your TMDb API key in .env
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function convertToEmbedUrl(urlString) {
    try {
        // 1. Check for common shorthand URLs (youtu.be/VIDEO_ID)
        if (urlString.includes("youtu.be/")) {
            const videoIdMatch = urlString.match(/(?:youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
            if (videoIdMatch && videoIdMatch[1]) {
                const videoId = videoIdMatch[1];
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        // 2. Use the URL object for standard watch URLs
        const url = new URL(urlString);

        // Check if it's a YouTube domain and has the 'v' parameter
        if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
            const videoId = url.searchParams.get('v');

            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        // Fallback for cases like /embed/ already being present (just in case)
        const pathParts = url.pathname.split('/');
        const lastPathPart = pathParts[pathParts.length - 1];
        if (lastPathPart.length === 11) { // 11 is the standard length of a YouTube ID
            return `https://www.youtube.com/embed/${lastPathPart}`;
        }

        // If no video ID found, return null
        return null;

    } catch (error) {
        // Catch potential errors from new URL() if the string is not a valid URL
        console.error("Invalid URL provided:", error);
        return null;
    }
}

// Full-screen overlay modal
const AddMovieModal = ({ isOpen, onClose }) => {
    const [trailerUrl, setTrailerUrl] = useState("");
    const [movieName, setMovieName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null); // ✅ new state

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
                className="h-[90%] w-[90%] rounded-2xl p-8 pb-0 shadow-2xl relative overflow-auto"
                style={{
                    backgroundColor: "var(--md-sys-color-surface-container-highest)",
                    color: "var(--md-sys-color-on-surface)"
                }}
            >
                <div className='flex'>
                    <div className='w-[50%] flex-none'>
                        <h2
                            className="text-xl font-bold mb-4"
                            style={{ color: "var(--md-sys-color-on-surface)" }}
                        >
                            Add New Movie
                        </h2>
                        {/* Poster URL Input */}
                        <input
                            type="text"
                            placeholder="Enter trailer Link"
                            className="w-[100%] p-3 mb-4 rounded-full border"
                            style={{
                                backgroundColor: "var(--md-sys-color-surface-container)",
                                color: "var(--md-sys-color-on-surface)",
                                borderColor: "var(--md-sys-color-outline)"
                            }}
                            value={trailerUrl}
                            onChange={(e) => setTrailerUrl(e.target.value)}
                        />

                        {/* Movie Name Input + Buttons */}
                        <div>
                            <input
                                type="text"
                                placeholder="Enter movie name"
                                className="w-[50%] p-3 mb-4 mr-4 rounded-full border"
                                style={{
                                    backgroundColor: "var(--md-sys-color-surface-container)",
                                    color: "var(--md-sys-color-on-surface)",
                                    borderColor: "var(--md-sys-color-outline)"
                                }}
                                value={movieName}
                                onChange={(e) => setMovieName(e.target.value)}
                            />
                            <button
                                className="px-6 py-3 rounded-full mr-2 transition w-[25%] hover:cursor-pointer hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-primary-container"
                                style={{
                                    backgroundColor: "var(--md-sys-color-primary)",
                                    color: "var(--md-sys-color-on-primary)"
                                }}
                                onClick={handleSearch}
                            >
                                Search movies
                            </button>
                            <button
                                className="px-6 py-3 rounded-full transition w-[20%] hover:cursor-pointer hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-primary-container"
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

                    <iframe className='w-[30%] pl-12' src={convertToEmbedUrl(trailerUrl)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>



                {/* Search Results */}
                <div
                    className="mt-6 h-[56%] rounded-2xl p-4 overflow-x-auto"
                    style={{
                        backgroundColor: "var(--md-sys-color-surface-variant)",
                        color: "var(--md-sys-color-on-surface-variant)"
                    }}
                >
                    {loading && (
                        <p
                            className="text-center"
                            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                        >
                            Loading...
                        </p>
                    )}

                    {!loading && searchResults.length === 0 && (
                        <p
                            className="text-center"
                            style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                        >
                            No results
                        </p>
                    )}

                    <div className="flex space-x-4">
                        {searchResults.map((movie) => {
                            const isSelected = selectedMovie?.id === movie.id;
                            return (
                                <div
                                    key={movie.id}
                                    onClick={() => setSelectedMovie(movie)}
                                    className={`rounded-lg shadow p-2 text-center flex-shrink-0 w-40 cursor-pointer transition-all
                                        ${isSelected ? "border-4 border-[var(--md-sys-color-primary)] scale-105" : "border-0"}`}
                                    style={{
                                        backgroundColor: "var(--md-sys-color-surface)",
                                        color: "var(--md-sys-color-on-surface)"
                                    }}
                                >
                                    {movie.poster_path ? (
                                        <img
                                            src={IMAGE_BASE + movie.poster_path}
                                            alt={movie.title}
                                            className="rounded-md w-full h-60 object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="h-60 flex items-center justify-center rounded-md"
                                            style={{
                                                backgroundColor: "var(--md-sys-color-surface-container-high)",
                                                color: "var(--md-sys-color-on-surface-variant)"
                                            }}
                                        >
                                            No Image
                                        </div>
                                    )}
                                    <h3 className="mt-2 font-semibold text-sm truncate" style={{ color: "var(--md-sys-color-on-surface)" }}> {movie.title} </h3>
                                    <p className="text-xs" style={{ color: "var(--md-sys-color-on-surface-variant)" }}> ID: {movie.id} </p>
                                </div>
                            );
                        })}
                    </div>
                </div>


                {/* Submit Button */}
                <div className='flex flex-row-reverse mt-4'>
                    <button
                        className="px-6 py-3 rounded-full mr-2 transition w-[25%] hover:cursor-pointer"
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
                                    movieName: selectedMovie.original_title || selectedMovie.title,
                                    movieId: selectedMovie.id,
                                    movieTrailer: trailerUrl
                                };

                                console.log("Submitting data:", data);
                                // window.reload();
                                onClose();
                                const result = await api.addMovie(data);
                                console.log("Success:", result);
                                // Reset form and close modal
                                setSelectedMovie(null);
                                setTrailerUrl("");
                                setMovieName("");
                                setSearchResults([]);


                                // alert("Movie added successfully!");

                            } catch (error) {
                                console.error("Error adding movie:", error);
                                // alert("Failed to add carousel poster. Please try again.");
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
