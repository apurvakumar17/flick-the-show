import React from 'react'
import MovieCard from './MovieCard';

function PreviousBookings() {
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
    return (
        <div>
            <h1 className='text-2xl font-bold text-(--md-sys-color-on-background) my-3 text-left'>Previous Bookings</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        genres={movie.genres}
                        imageUrl={movie.imageUrl}
                    />
                ))}
            </div>
        </div>
    )
}

export default PreviousBookings
