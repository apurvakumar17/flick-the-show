import React, { useState, useEffect } from 'react';
import leftArrow from "../assets/carousel_left.png";
import rightArrow from "../assets/carousel_right.png";
import { api } from "../services/api";

function MainCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]); // Changed from slides1 to slides
    const [loading, setLoading] = useState(true);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        if (slides.length === 0) return; // Don't start interval if no slides
        
        const slideInterval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(slideInterval);
    }, [slides.length]); // Depend on slides.length

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const data = await api.getCarouselPosters();
                setSlides(data);
                console.log('Carousel data:', data); // Debug log
            } catch (error) {
                console.error('Error fetching movies:', error);
                setSlides([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    // Show loading or empty state
    if (loading) {
        return (
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg mt-8 bg-(--md-sys-color-surface-container-low) h-64 flex items-center justify-center px-5">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto m-4" style={{ borderColor: "var(--md-sys-color-primary)" }}></div>
                <div className="text-(--md-sys-color-on-surface) ml-4">Loading ...</div>
            </div>
        );
    }

    if (slides.length === 0) {
        return (
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg mt-8 bg-(--md-sys-color-surface-container-low) h-64 flex items-center justify-center">
                <div className="text-(--md-sys-color-on-surface)">No carousel images available</div>
            </div>
        );
    }

    return (
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg mt-8 bg-(--md-sys-color-surface-container-low)">
            {/* Slide track */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={slide._id || index} className="flex-none w-full relative">
                        <img
                            src={slide.posterLink}
                            className="block w-full h-auto rounded-lg bg-(--md-sys-color-surface-variant) cursor-pointer transition-transform duration-300 hover:scale-105"
                            alt={slide.movieName || `Slide ${index + 1}`}
                            onClick={() => {
                                if (slide.movieId) {
                                    window.open(`/movie/${slide.movieId}`, '_self');
                                }
                            }}
                            onError={(e) => {
                                console.error('Image failed to load:', slide.posterLink);
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Slider controls */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full 
                           bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)
                           p-2 transition hover:scale-105 shadow-md"
            >
                <img src={leftArrow} className="h-4" alt="Previous" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full 
                           bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary)
                           p-2 transition hover:scale-105 shadow-md"
            >
                <img src={rightArrow} className="h-4" alt="Next" />
            </button>

            {/* Slider indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full transition-all ease-in-out duration-300 
                            ${currentSlide === index
                                ? "bg-(--md-sys-color-primary) scale-115"
                                : "bg-(--md-sys-color-outline-variant)"}`}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default MainCarousel;