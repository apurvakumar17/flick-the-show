import React, { useState } from "react";
import AddPosterModal from "./AddPosterModal";

// Mock data to simulate the posters shown in the image
const initialCarouselItems = [
    { id: 1196943, image: "/posters/chaava_poster.jpg" },
    { id: 1383072, image: "/posters/mnarsimha_poster.jpg" },
    { id: 857598, image: "/posters/pushpa2_poster.jpg" }
];

// Component for a single poster card with a delete button
const CarouselPosterCard = ({ item }) => {
    const handleDelete = () => {
        console.log(`Deleting carousel item: ${item.id}`);
    };

    return (
        <div
            style={{
                backgroundColor: "var(--md-sys-color-surface)",
                borderColor: "var(--md-sys-color-outline-variant)",
                color: "var(--md-sys-color-on-surface)",
                boxShadow: "0 4px 6px var(--md-sys-color-shadow)"
            }}
            className="relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-2xl"
        >
            <img
                src={item.image}
                alt={`Carousel Poster ${item.id}`}
                className="w-full aspect-video object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x450/9CA3AF/FFFFFF?text=Image+Error" }}
            />

            <button
                aria-label="Delete Poster"
                onClick={handleDelete}
                style={{
                    backgroundColor: "var(--md-sys-color-error)",
                    color: "var(--md-sys-color-on-error)"
                }}
                className="absolute top-2 right-2 p-2 rounded-full opacity-90 transition-opacity duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-error-container shadow-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
            </button>
        </div>
    );
};

// Component for the "Add New Poster" tile
const AddPosterCard = ({ onOpen }) => {
    return (
        <button
            onClick={onOpen}
            aria-label="Add New Carousel Poster"
            style={{
                backgroundColor: "var(--md-sys-color-surface-variant)",
                color: "var(--md-sys-color-on-surface-variant)",
                borderColor: "var(--md-sys-color-outline)"
            }}
            className="w-full aspect-video rounded-xl shadow-inner transition-all duration-300 flex items-center justify-center border-4 border-dashed transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-primary-container hover:cursor-pointer"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
        </button>
    );
};



// Main Component
function EditCarouselPosters() {
    // const [carouselItems, setCarouselItems] = useState([
    //     { id: 1196943, image: "/posters/chaava_poster.jpg" },
    //     { id: 1383072, image: "/posters/mnarsimha_poster.jpg" },
    //     { id: 857598, image: "/posters/pushpa2_poster.jpg" }
    // ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className="pb-6 mt-4 border-b"
            style={{ borderColor: "var(--md-sys-color-surface-container-high)" }}
        >
            <div className="max-w-7xl">
                <h1
                    className='text-2xl font-bold mb-8 text-left'
                    style={{ color: "var(--md-sys-color-on-background)" }}
                >
                    Carousel Posters
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialCarouselItems.map((item) => (
                        <CarouselPosterCard key={item.id} item={item} />
                    ))}

                    <AddPosterCard onOpen={() => setIsModalOpen(true)} />
                </div>
            </div>

            {/* Full-screen Modal */}
            <AddPosterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            
        </div>
    );
}

export default EditCarouselPosters;
