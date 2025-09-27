// src/components/MovieCard.jsx
import React from 'react';

const MovieTicket = ({ movieId, title, qrUrl, transactionId, date, time }) => {
    return (
        <div className="p-6 pt-10 bg-contain bg-[url(/ticket_bg.png)] bg-(--md-sys-color-surface-container-low) rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
            {/* Image */}
            <img
                src={qrUrl}
                alt={title}
                className="w-full rounded-2xl bg-(--md-sys-color-surface-variant) border-7 border-black" // fallback bg for empty img
            />

            {/* Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-(--md-sys-color-inverse-on-surface) truncate">
                    {title}
                </h3>
                <p className="text-sm text-(--md-sys-color-inverse-on-surface)">
                    TransactionID: {transactionId}
                    Date: {date}
                    Time: {time}
                </p>
            </div>
        </div>

    );
};

export default MovieTicket;