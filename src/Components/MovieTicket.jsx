import React from 'react';

const MovieTicket = ({ movieId, title, qrUrl, transactionId, date, time }) => {
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
                    {qrUrl ? (
                        <img src={qrUrl} alt={title ? `${title} QR` : 'Ticket QR'} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-xs" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>QR unavailable</div>
                    )}
                </div>

                <h3
                    className="mt-4 text-lg font-semibold truncate"
                    style={{ color: 'var(--md-sys-color-inverse-on-surface)' }}
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