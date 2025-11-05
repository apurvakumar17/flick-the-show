import React, { useState } from 'react'
import MovieTicket from './MovieTicket';
import TicketModal from './TicketModal'

function PreviousBookings({ tickets = [] }) {
    const [selectedMovie, setSelectedMovie] = useState(null);

    return (
        <div className="container mx-auto px-4 py-8 bg-(--md-sys-color-background)">
            <h2 className="text-2xl font-bold text-(--md-sys-color-on-background) mb-6">
                Previous Bookings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tickets.map((movie) => (
                    <div key={movie.id} onClick={() => setSelectedMovie(movie)} className="cursor-pointer">
                        <MovieTicket
                            movieId={movie.id}
                            title={movie.title}
                            transactionId={movie.transactionId}
                            date={movie.date}
                            time={movie.time}
                        />
                    </div>
                ))}
            </div>
            <TicketModal
                isOpen={!!selectedMovie}
                onClose={() => setSelectedMovie(null)}
                movie={selectedMovie}
            />
        </div>
    )
}

export default PreviousBookings
