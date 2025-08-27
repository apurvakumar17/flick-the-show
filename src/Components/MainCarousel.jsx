import React from 'react'
import { useState, useEffect } from 'react';

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
    }, [nextSlide]);

    return (
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg mt-8">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="flex-none w-full relative">
                        <img src={slide.image} className="block w-full h-auto" alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>

            {/* Slider controls */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white bg-opacity-30 p-2 text-2xl text-white transition hover:bg-opacity-50"
            >
                &#10094;
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white bg-opacity-30 p-2 text-2xl text-white transition hover:bg-opacity-50"
            >
                &#10095;
            </button>

            {/* Slider indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                    ></button>
                ))}
            </div>
        </div>
    )
}

export default MainCarousel
