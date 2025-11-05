import React, { useState } from 'react'
import MovieTicket from './MovieTicket';
import TicketModal from './TicketModal'

function PreviousBookings() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    
    const moviestickets = [
        {
            id: 1383072,
            title: "Mahavatar Narsimha",
            qrUrl: "/qrcodes/mnarsimha_qr.jpg", // path to QR code image
            transactionId: "TXN123456",
            date: "2025-09-30",
            time: "07:30 PM",
        },
        {
            id: 1109086,
            title: "War 2",
            qrUrl: "/qrcodes/war2_qr.jpg",
            transactionId: "TXN123457",
            date: "2025-10-01",
            time: "09:00 PM",
        },
        {
            id: 373449,
            title: "2.0",
            qrUrl: "/qrcodes/robot2_qr.jpg",
            transactionId: "TXN123458",
            date: "2025-10-03",
            time: "06:00 PM",
        },
        {
            id: 822119,
            title: "Captain America B...",
            qrUrl: "/qrcodes/capbrave_qr.jpg",
            transactionId: "TXN123459",
            date: "2025-10-05",
            time: "08:15 PM",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8 bg-(--md-sys-color-background)">
            <h2 className="text-2xl font-bold text-(--md-sys-color-on-background) mb-6">
                Previous Bookings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {moviestickets.map((movie) => (
                    <div key={movie.id} onClick={() => setSelectedMovie(movie)} className="cursor-pointer">
                        <MovieTicket
                            movieId={movie.id}
                            title={movie.title}
                            qrUrl={movie.qrUrl}
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
