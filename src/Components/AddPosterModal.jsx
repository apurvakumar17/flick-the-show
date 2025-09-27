import React, { useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // store your TMDb API key in .env
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

// Full-screen overlay modal
const AddPosterModal = ({ isOpen, onClose }) => {
    const [posterUrl, setPosterUrl] = useState("");
    const [movieName, setMovieName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

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
                            Add Carousel Poster
                        </h2>
                        {/* Poster URL Input */}
                        <input
                            type="text"
                            placeholder="Enter carousel poster URL"
                            className="w-[100%] p-3 mb-4 rounded-full border"
                            style={{
                                backgroundColor: "var(--md-sys-color-surface-container)",
                                color: "var(--md-sys-color-on-surface)",
                                borderColor: "var(--md-sys-color-outline)"
                            }}
                            value={posterUrl}
                            onChange={(e) => setPosterUrl(e.target.value)}
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
                                className="px-6 py-3 rounded-full mr-2 transition w-[25%] hover:cursor-pointer"
                                style={{
                                    backgroundColor: "var(--md-sys-color-primary)",
                                    color: "var(--md-sys-color-on-primary)"
                                }}
                                onClick={handleSearch}
                            >
                                Search movies
                            </button>
                            <button
                                className="px-6 py-3 rounded-full transition w-[20%] hover:cursor-pointer"
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

                    {/* Live Poster Preview */}
                    <div className='w-[50%] pl-10'>
                        {posterUrl && (
                            <div className="">
                                <div className="h-40 rounded-lg overflow-hidden flex items-center justify-center">
                                    <img
                                        src={posterUrl}
                                        alt="Poster Preview"
                                        className="h-full"
                                        onError={(e) => (e.currentTarget.src = "/posters/placeholder.png")}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
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
                        {searchResults.map((movie) => (
                            <div
                                key={movie.id}
                                className="rounded-lg shadow p-2 text-center flex-shrink-0 w-40"
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
                                <h3
                                    className="mt-2 font-semibold text-sm truncate"
                                    style={{ color: "var(--md-sys-color-on-surface)" }}
                                >
                                    {movie.title}
                                </h3>
                                <p
                                    className="text-xs"
                                    style={{ color: "var(--md-sys-color-on-surface-variant)" }}
                                >
                                    ID: {movie.id}
                                </p>
                            </div>
                        ))}
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
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddPosterModal;
