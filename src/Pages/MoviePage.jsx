import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { api } from '../services/api';
import { convertToEmbedUrl } from '../utils/youtubeUtils';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE = "https://image.tmdb.org/t/p/w1280";

export default function MoviePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [trailerLoading, setTrailerLoading] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [runningCheckLoading, setRunningCheckLoading] = useState(true);

    const getMovieData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
            );
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            console.log("Movie data:", data);
            setMovie(data);
        } catch (error) {
            console.error("Error fetching movie:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getMovieTrailer = async () => {
        if (!id) return;
        setTrailerLoading(true);
        try {
            const trailerData = await api.getMovieTrailer(id);
            if (trailerData && trailerData.trim()) {
                const embedUrl = convertToEmbedUrl(trailerData);
                if (embedUrl) {
                    setTrailerUrl(embedUrl);
                }
            }
        } catch (error) {
            console.error("Error fetching trailer:", error);
        } finally {
            setTrailerLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getMovieData();
            getMovieTrailer();
            // Check if movie is in currently running DB
            (async () => {
                try {
                    setRunningCheckLoading(true);
                    const running = await api.getMovies();
                    const exists = Array.isArray(running) && running.some((m) => String(m.movieId) === String(id));
                    setIsRunning(exists);
                } catch (e) {
                    setIsRunning(false);
                } finally {
                    setRunningCheckLoading(false);
                }
            })();
        }
    }, [id]);

    // Format runtime to hours and minutes
    const formatRuntime = (minutes) => {
        if (!minutes) return "N/A";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    // Format currency
    const formatCurrency = (amount) => {
        if (!amount) return "N/A";
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--md-sys-color-background)" }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: "var(--md-sys-color-primary)" }}></div>
                    <p style={{ color: "var(--md-sys-color-on-background)" }}>Loading movie details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--md-sys-color-background)" }}>
                <div className="text-center max-w-md mx-auto p-6">
                    <div className="text-6xl mb-4">🎬</div>
                    <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--md-sys-color-error)" }}>Error Loading Movie</h2>
                    <p className="mb-4" style={{ color: "var(--md-sys-color-on-background)" }}>{error}</p>
                    <button 
                        onClick={getMovieData}
                        className="px-6 py-2 rounded-lg font-medium transition-colors"
                        style={{ 
                            backgroundColor: "var(--md-sys-color-primary)",
                            color: "var(--md-sys-color-on-primary)"
                        }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--md-sys-color-background)" }}>
                <div className="text-center">
                    <h2 style={{ color: "var(--md-sys-color-on-background)" }}>Movie not found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: "var(--md-sys-color-background)" }}>
            {/* Hero Section with Backdrop */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
                {movie.backdrop_path && (
                    <img
                        src={`${BACKDROP_BASE}${movie.backdrop_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Movie Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                        {movie.title}
                    </h1>
                    {movie.tagline && (
                        <p className="text-lg md:text-xl text-gray-300 italic">
                            "{movie.tagline}"
                        </p>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Poster and Basic Info */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <img
                                src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : "https://placehold.co/400x600/9CA3AF/FFFFFF?text=No+Poster"}
                                alt={movie.title}
                                className="w-full rounded-xl shadow-2xl mb-6"
                            />
                            
                            {/* Book Tickets Button */}
                            {runningCheckLoading ? (
                                <div className="w-full py-4 px-6 rounded-xl text-center" style={{ backgroundColor: "var(--md-sys-color-surface-variant)", color: "var(--md-sys-color-on-surface-variant)" }}>
                                    Checking availability...
                                </div>
                            ) : isRunning ? (
                                <button
                                    onClick={() => navigate(`/book/${id}`)}
                                    className="w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 cursor-pointer"
                                    style={{ 
                                        backgroundColor: "var(--md-sys-color-primary)",
                                        color: "var(--md-sys-color-on-primary)",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                                    }}
                                >
                                    Book Tickets
                                </button>
                            ) : (
                                <div className="w-full py-4 px-6 rounded-xl text-center font-medium" style={{ backgroundColor: "var(--md-sys-color-surface-variant)", color: "var(--md-sys-color-on-surface-variant)" }}>
                                    Not screening currently
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Movie Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overview */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--md-sys-color-on-background)" }}>
                                Overview
                            </h2>
                            <p className="text-lg leading-relaxed" style={{ color: "var(--md-sys-color-on-surface)" }}>
                                {movie.overview}
                            </p>
                        </div>

                        {/* Trailer Section */}
                        {trailerUrl && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--md-sys-color-on-background)" }}>
                                    Trailer
                                </h2>
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                    <iframe
                                        className="w-full h-full"
                                        src={trailerUrl}
                                        title="Movie Trailer"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}

                        {trailerLoading && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--md-sys-color-on-background)" }}>
                                    Trailer
                                </h2>
                                <div className="flex items-center justify-center h-48">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-2" style={{ borderColor: "var(--md-sys-color-primary)" }}></div>
                                        <p style={{ color: "var(--md-sys-color-on-surface)" }}>Loading trailer...</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Movie Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Info */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--md-sys-color-on-background)" }}>
                                    Movie Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="font-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Release Date:</span>
                                        <span style={{ color: "var(--md-sys-color-on-surface)" }}>{formatDate(movie.release_date)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Runtime:</span>
                                        <span style={{ color: "var(--md-sys-color-on-surface)" }}>{formatRuntime(movie.runtime)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Status:</span>
                                        <span style={{ color: "var(--md-sys-color-on-surface)" }}>{movie.status}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Language:</span>
                                        <span style={{ color: "var(--md-sys-color-on-surface)" }}>{movie.original_language?.toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Ratings & Stats */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--md-sys-color-on-background)" }}>
                                    Ratings & Stats
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="font-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Rating:</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-yellow-400">⭐</span>
                                            <span style={{ color: "var(--md-sys-color-on-surface)" }}>
                                                {movie.vote_average?.toFixed(1)}/10
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Votes:</span>
                                        <span style={{ color: "var(--md-sys-color-on-surface)" }}>
                                            {movie.vote_count?.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Popularity:</span>
                                        <span style={{ color: "var(--md-sys-color-on-surface)" }}>
                                            {movie.popularity?.toFixed(0)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Adult:</span>
                                        <span style={{ color: "var(--md-sys-color-on-surface)" }}>
                                            {movie.adult ? "Yes" : "No"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Genres */}
                        {movie.genres && movie.genres.length > 0 && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--md-sys-color-on-background)" }}>
                                    Genres
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                                            style={{ 
                                                backgroundColor: "var(--md-sys-color-primary-container)",
                                                color: "var(--md-sys-color-on-primary-container)"
                                            }}
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Production Companies */}
                        {movie.production_companies && movie.production_companies.length > 0 && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--md-sys-color-on-background)" }}>
                                    Production Companies
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {movie.production_companies.map((company) => (
                                        <div key={company.id} className="flex items-center gap-3">
                                            {company.logo_path && (
                                                <img
                                                    src={`${IMAGE_BASE}${company.logo_path}`}
                                                    alt={company.name}
                                                    className="w-8 h-8 object-contain"
                                                />
                                            )}
                                            <span style={{ color: "var(--md-sys-color-on-surface)" }}>
                                                {company.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Financial Information */}
                        {(movie.budget > 0 || movie.revenue > 0) && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--md-sys-color-on-background)" }}>
                                    Financial Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <span className="font-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Budget:</span>
                                        <p className="text-2xl font-bold" style={{ color: "var(--md-sys-color-on-surface)" }}>
                                            {formatCurrency(movie.budget)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-medium" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>Revenue:</span>
                                        <p className="text-2xl font-bold" style={{ color: "var(--md-sys-color-on-surface)" }}>
                                            {formatCurrency(movie.revenue)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Spoken Languages */}
                        {/* {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--md-sys-color-on-background)" }}>
                                    Spoken Languages
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {movie.spoken_languages.map((language, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-lg text-sm"
                                            style={{ 
                                                backgroundColor: "var(--md-sys-color-surface-variant)",
                                                color: "var(--md-sys-color-on-surface-variant)"
                                            }}
                                        >
                                            {language.english_name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )} */}

                        {/* External Links */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                            <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--md-sys-color-on-background)" }}>
                                External Links
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {movie.homepage && (
                                    <a
                                        href={movie.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                                        style={{ 
                                            backgroundColor: "var(--md-sys-color-primary)",
                                            color: "var(--md-sys-color-on-primary)",
                                            textDecoration: "underline" 
                                        }}
                                    >
                                        Official Website
                                    </a>
                                )}
                                {movie.imdb_id && (
                                    <a
                                        href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                                        style={{ 
                                            backgroundColor: "var(--md-sys-color-secondary)",
                                            color: "var(--md-sys-color-on-secondary)",
                                            textDecoration: "underline" 
                                        }}
                                    >
                                        IMDb
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            {/* <div className="text-center py-8 border-t border-white/10">
                <p style={{ color: "var(--md-sys-color-on-surface-variant)" }}>
                    Flick The Show
                </p>
            </div> */}
            <Footer></Footer>
        </div>
    );
}
