// src/components/TicketModal.jsx
import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const TicketModal = ({ isOpen, onClose, movie }) => {
    const [poster, setPoster] = useState(null);

    useEffect(() => {
        if (!movie?.id) return;

        const fetchPoster = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`
                );
                const data = await res.json();
                if (data.poster_path) {
                    setPoster(IMAGE_BASE + data.poster_path);
                } else {
                    setPoster(null);
                }
            } catch (err) {
                console.error("Error fetching poster:", err);
                setPoster(null);
            }
        };

        fetchPoster();
    }, [movie]);

    if (!isOpen || !movie) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div
                className="relative rounded-2xl p-6 w-[90%] max-w-md shadow-2xl border border-yellow-400 bg-cover bg-center"
                style={{
                    backgroundImage: poster
                        ? `url(${poster})`
                        : "linear-gradient(to bottom, #fef3c7, #78350f)",
                }}
            >
                {/* Overlay to darken background for readability */}
                <div className="absolute inset-0 bg-black/60 rounded-2xl"></div>

                {/* Content on top of overlay */}
                <div className="relative z-10">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-white hover:scale-110 transition"
                    >
                        ✕
                    </button>

                    {/* Poster & Title */}
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={poster || "/fallback_poster.jpg"}
                            alt={movie.title}
                            className="w-12 h-16 object-cover rounded-md"
                        />
                        <div>
                            <h2 className="text-xl font-bold text-white">{movie.title}</h2>
                            <p className="text-sm text-gray-200">
                                {movie.genres || "Action/Drama"}
                            </p>
                        </div>
                    </div>

                    {/* QR Code */}
                    <div className="flex justify-center mb-4">
                        <img
                            src={movie.qrUrl}
                            alt="QR Code"
                            className="w-40 h-40 rounded-md bg-white p-2"
                        />
                    </div>

                    {/* Ticket Details */}
                    <div className="space-y-2 text-sm text-white">
                        <p>
                            <span className="font-semibold">Booking ID:</span>{" "}
                            {movie.transactionId}
                        </p>
                        <p>
                            <span className="font-semibold">Date & Time:</span> {movie.date} |{" "}
                            {movie.time}
                        </p>
                        <p>
                            <span className="font-semibold">Theatre:</span> INOX Janak Place,
                            District Centre, New Delhi
                        </p>
                        <p>
                            <span className="font-semibold">Screen & Seats:</span> SCREEN 2 |
                            C11, C12, C13
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketModal;
