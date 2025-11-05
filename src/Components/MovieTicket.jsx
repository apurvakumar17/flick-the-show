import React, { useEffect, useState } from 'react';

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MovieTicket = ({ movieId, title, transactionId, date, time }) => {
    const [posterUrl, setPosterUrl] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const loadPoster = async () => {
            if (!movieId) { setPosterUrl(null); return; }
            try {
                const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
                if (!res.ok) { setPosterUrl(null); return; }
                const data = await res.json();
                if (!cancelled) setPosterUrl(data?.poster_path ? IMAGE_BASE + data.poster_path : null);
            } catch {
                if (!cancelled) setPosterUrl(null);
            }
        };
        loadPoster();
        return () => { cancelled = true };
    }, [movieId]);
    return (
        <div
            className="mx-auto rounded-xl shadow-md"
            style={{
                width: 320,
                minHeight: 520,
                background: 'var(--md-sys-color-surface-container-high)',
                color: 'var(--md-sys-color-on-surface)',
                border: '1px solid var(--md-sys-color-outline-variant)'
            }}
        >
            <div className="p-5">
                <div
                    className="w-full aspect-square rounded-lg flex items-center justify-center overflow-hidden"
                    style={{ background: 'var(--md-sys-color-surface-variant)', border: '1px solid var(--md-sys-color-outline)' }}
                >
                    {posterUrl ? (
                        <img src={posterUrl} alt={title ? `${title} Poster` : 'Movie Poster'} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-xs" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Poster unavailable</div>
                    )}
                </div>

                <h3
                    className="mt-4 text-lg font-semibold truncate"
                    style={{ color: 'var(--md-sys-color-on-surface-variant)' }}
                    title={title}
                >
                    {title}
                </h3>

                <div className="mt-3 space-y-3">
                    <div>
                        <div className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Transaction ID</div>
                        <div className="text-sm break-all">{transactionId}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Date</div>
                            <div className="text-sm">{date}</div>
                        </div>
                        <div className="text-[10px] opacity-60">•</div>
                        <div>
                            <div className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Time</div>
                            <div className="text-sm">{time}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieTicket;