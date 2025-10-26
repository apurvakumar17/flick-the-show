// src/components/Carousel.jsx
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import MovieCard from "./MovieCard"; // import your card
import { api } from "../services/api";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 20;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({

    items, // now pass movies here
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    loop = false,

}) {

    const [movielist, setmovielist] = useState([]);
    const [loading, setLoading] = useState(true);

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

    // Use movielist as carouselItems, but only when it has data
    const carouselItems = movielist.length > 0 ? movielist : [];
    const itemWidth = window.innerWidth * 0.81; // Card width (like MovieCard)
    const trackItemOffset = itemWidth + GAP;

    const finalCarouselItems = loop && carouselItems.length > 0 ? [...carouselItems, carouselItems[0]] : carouselItems;
    const [currentIndex, setCurrentIndex] = useState(0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const containerRef = useRef(null);

    // Pause on hover
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
            return () => {
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    // Autoplay
    useEffect(() => {
        if (autoplay && (!pauseOnHover || !isHovered)) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => {
                    if (prev === carouselItems.length - 1 && loop) return prev + 1;
                    if (prev === finalCarouselItems.length - 1) return loop ? 0 : prev;
                    return prev + 1;
                });
            }, autoplayDelay);
            return () => clearInterval(timer);
        }
    }, [autoplay, autoplayDelay, isHovered, loop, carouselItems.length, finalCarouselItems.length, pauseOnHover]);

    const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationComplete = () => {
        if (loop && currentIndex === finalCarouselItems.length - 1) {
            setIsResetting(true);
            x.set(0);
            setCurrentIndex(0);
            setTimeout(() => setIsResetting(false), 50);
        }
    };

    const handleDragEnd = (_, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
            if (loop && currentIndex === carouselItems.length - 1) setCurrentIndex(currentIndex + 1);
            else setCurrentIndex((prev) => Math.min(prev + 1, finalCarouselItems.length - 1));
        } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
            if (loop && currentIndex === 0) setCurrentIndex(carouselItems.length - 1);
            else setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * (finalCarouselItems.length - 1),
                right: 0,
            },
        };

    // Show loading state or return early if no data
    if (loading) {
        return (
            <div className="my-4 relative overflow-hidden w-full p-6 rounded-2xl bg-(--md-sys-color-surface-container-lowest)">
                <div className="flex justify-center items-center h-64">
                    <div className="text-(--md-sys-color-on-surface)">Loading movies...</div>
                </div>
            </div>
        );
    }

    if (carouselItems.length === 0) {
        return (
            <div className="my-4 relative overflow-hidden w-full p-6 rounded-2xl bg-(--md-sys-color-surface-container-lowest)">
                <div className="flex justify-center items-center h-64">
                    <div className="text-(--md-sys-color-on-surface)">No movies available</div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="my-4 relative overflow-hidden w-full p-6 rounded-2xl bg-(--md-sys-color-surface-container-lowest)"
        >
            <motion.div
                className="flex"
                drag="x"
                {...dragProps}
                style={{
                    gap: `${GAP}px`,
                    x,
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(currentIndex * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationComplete={handleAnimationComplete}
            >
                {finalCarouselItems.map((movie, index) => {
                    return (
                        <motion.div
                            key={index}
                            className="shrink-0"
                            style={{
                                width: itemWidth,
                            }}
                            transition={effectiveTransition}
                        >
                            {/* Movie Card inside */}
                            <MovieCard key={movie.id || index} movie={movie} />
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center mt-4">
                {carouselItems.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 m-1 ${currentIndex % carouselItems.length === index
                            ? "bg-(--md-sys-color-primary)"
                            : "bg-(--md-sys-color-outline-variant)"
                            }`}
                        animate={{
                            scale: currentIndex % carouselItems.length === index ? 1.2 : 1,
                        }}
                        onClick={() => setCurrentIndex(index)}
                        transition={{ duration: 0.15 }}
                    />
                ))}
            </div>
        </div>
    );
}
