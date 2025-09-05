import React, { useState, useEffect } from 'react';
import leftArrow from "../assets/carousel_left.png";
import rightArrow from "../assets/carousel_right.png";

function MainCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: "/posters/chaava_poster.jpg",
            caption: { title: "First slide label", text: "Nulla vitae elit libero, a pharetra augue mollis interdum." }
        },
        {
            image: "/posters/mnarsimha_poster.jpg",
            caption: { title: "Second slide label", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." }
        },
        {
            image: "/posters/pushpa2_poster.jpg",
            caption: { title: "Third slide label", text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur." }
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(slideInterval);
    }, []);

    return (
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg mt-8 bg-(--md-sys-color-surface-container-low)">
            {/* Slide track */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="flex-none w-full relative">
                        <img
                            src={slide.image}
                            className="block w-full h-auto rounded-lg bg-(--md-sys-color-surface-variant)"
                            alt={`Slide ${index + 1}`}
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
