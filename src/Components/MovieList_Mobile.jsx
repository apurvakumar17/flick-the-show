// src/components/Carousel.jsx
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import MovieCard from "./MovieCard"; // import your card

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

    items = movies;
    const itemWidth = window.innerWidth * 0.81; // Card width (like MovieCard)
    const trackItemOffset = itemWidth + GAP;

    const carouselItems = loop ? [...items, items[0]] : items;
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
                    if (prev === items.length - 1 && loop) return prev + 1;
                    if (prev === carouselItems.length - 1) return loop ? 0 : prev;
                    return prev + 1;
                });
            }, autoplayDelay);
            return () => clearInterval(timer);
        }
    }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

    const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationComplete = () => {
        if (loop && currentIndex === carouselItems.length - 1) {
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
            if (loop && currentIndex === items.length - 1) setCurrentIndex(currentIndex + 1);
            else setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
        } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
            if (loop && currentIndex === 0) setCurrentIndex(items.length - 1);
            else setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * (carouselItems.length - 1),
                right: 0,
            },
        };

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
                {carouselItems.map((movie, index) => {
                    const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
                    const outputRange = [90, 0, -90];
                    const rotateY = useTransform(x, range, outputRange, { clamp: false });

                    return (
                        <motion.div
                            key={index}
                            className="shrink-0"
                            style={{
                                width: itemWidth,
                                rotateY,
                            }}
                            transition={effectiveTransition}
                        >
                            {/* Movie Card inside */}
                            <MovieCard title={movie.title} genres={movie.genres} imageUrl={movie.imageUrl} />
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center mt-4">
                {items.map((_, index) => (
                    <motion.div
                        key={index}
                        className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 m-1 ${currentIndex % items.length === index
                            ? "bg-(--md-sys-color-primary)"
                            : "bg-(--md-sys-color-outline-variant)"
                            }`}
                        animate={{
                            scale: currentIndex % items.length === index ? 1.2 : 1,
                        }}
                        onClick={() => setCurrentIndex(index)}
                        transition={{ duration: 0.15 }}
                    />
                ))}
            </div>
        </div>
    );
}
