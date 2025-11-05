import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../services/api'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE = 'https://api.themoviedb.org/3'

function BookTicket() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAllowed, setIsAllowed] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedTheatre, setSelectedTheatre] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])


  const theatres = useMemo(() => ([
    { id: 1, logoUrl: "/Theatre Logo/inox.png", theatreName: "INOX Janakpuri, Janak Place", location: "" },
    { id: 2, logoUrl: "/Theatre Logo/pvr.png", theatreName: "PVR Vegas, Dwarka", location: "" },
    { id: 3, logoUrl: "/Theatre Logo/m2k.png", theatreName: "M2K Rohini, Sec-3", location: "" },
    { id: 4, logoUrl: "/Theatre Logo/cinepolis.png", theatreName: "Cinepolis Unity One, Rohini", location: "" },
    { id: 5, logoUrl: "/Theatre Logo/miraj.png", theatreName: "Chand Miraj Cinemas, Mayur Vihar Phase 1", location: "" },
  ]), [])

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${TMDB_BASE}/movie/${id}?api_key=${API_KEY}`)
        if (!res.ok) throw new Error(`TMDB error ${res.status}`)
        const data = await res.json()
        setMovie(data)

        const running = await api.getMovies()
        const allowed = Array.isArray(running) && running.some(m => String(m.movieId) === String(id))
        setIsAllowed(allowed)
      } catch (e) {
        setError(e.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    if (id) run()
  }, [id])

  const moveNext = () => setStep(prev => Math.min(prev + 1, 3))
  const moveBack = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSelectTheatre = (t) => {
    setSelectedTheatre(t)
    setSelectedSeats([])
    setStep(2)
  }

  const handleSeatClick = (seat) => {
    setSelectedSeats(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    )
  }


  const handleBook = () => {
    alert(`Booking confirmed for \nMovie: ${movie?.title}\nTheatre: ${selectedTheatre?.theatreName}\nSeat: ${selectedSeats}`)
  }

  const SeatGrid = () => {
    const rows = 8
    const cols = 12
    const labels = Array.from({ length: rows }, (_, r) => String.fromCharCode(65 + r))
    return (
      <div className="space-y-3">
        <div className="text-sm text-center sm:text-left" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
          Screen this way
        </div>
        <div className="h-2 rounded-full mx-auto sm:mx-0 max-w-xs sm:max-w-none" style={{ background: 'var(--md-sys-color-primary)' }} />
        <div
          className="grid gap-1 sm:gap-2 justify-items-center sm:justify-items-stretch"
          style={{ gridTemplateColumns: `repeat(auto-fill, minmax(25px, 1fr))` }}
        >
          {labels.flatMap((rowLabel) =>
            Array.from({ length: cols }, (_, c) => {
              const seat = `${rowLabel}${c + 1}`
              const isSelected = selectedSeats.includes(seat)
              return (
                <button
                  key={seat}
                  onClick={() => handleSeatClick(seat)}
                  className="aspect-square w-6 sm:w-8 rounded-md text-[9px] sm:text-[10px] flex items-center justify-center"
                  style={{
                    background: isSelected ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-variant)',
                    color: isSelected ? 'var(--md-sys-color-on-primary)' : 'var(--md-sys-color-on-surface-variant)',
                    border: `1px solid var(--md-sys-color-outline-variant)`
                  }}
                >
                  {seat}
                </button>
              )
            })
          )}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--md-sys-color-background)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 mx-auto mb-3" style={{ borderColor: 'var(--md-sys-color-primary)' }} />
          <p className="text-sm sm:text-base" style={{ color: 'var(--md-sys-color-on-background)' }}>Loading booking...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--md-sys-color-background)' }}>
        <div className="text-center max-w-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-2" style={{ color: 'var(--md-sys-color-error)' }}>Failed to load</h2>
          <p className="text-sm sm:text-base" style={{ color: 'var(--md-sys-color-on-background)' }}>{error}</p>
        </div>
      </div>
    )
  }

  if (!isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-3 sm:px-4" style={{ background: 'var(--md-sys-color-background)' }}>
        <div className="max-w-lg w-full rounded-xl p-4 sm:p-6 text-center" style={{ background: 'var(--md-sys-color-surface-container)', border: '1px solid var(--md-sys-color-outline-variant)' }}>
          <div className="text-4xl sm:text-5xl mb-3">🎬</div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--md-sys-color-on-surface)' }}>{movie?.title || 'Movie'}</h2>
          <p className="text-sm sm:text-base" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>This movie is not currently running. Bookings are unavailable.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex justify-center items-center flex-col px-4" style={{ background: 'var(--md-sys-color-background)' }}>
      <Navbar></Navbar>
      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          {movie?.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={movie.title}
              className="w-24 h-36 object-cover rounded-lg mx-auto sm:mx-0"
              style={{ border: '1px solid var(--md-sys-color-outline-variant)' }}
            />
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--md-sys-color-on-background)' }}>{movie?.title}</h1>
            {movie?.tagline && (
              <p className="italic text-sm sm:text-base" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                "{movie.tagline}"
              </p>
            )}
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-4 sm:mb-6 grid grid-cols-3 gap-2">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-2 rounded-full" style={{ background: step >= n ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-surface-variant)' }} />
          ))}
        </div>
        <div className="rounded-xl p-4 sm:p-5 w-[90vw] sm:w-[40vw] mx-auto transition-all duration-300" style={{ background: 'var(--md-sys-color-surface-container)', border: '1px solid var(--md-sys-color-outline-variant)' }}>
          {step === 1 && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4" style={{ color: 'var(--md-sys-color-on-surface)' }}>Choose a theatre</h2>
              <div className="space-y-3">
                {theatres.map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTheatre(t)}
                    className="w-full text-left flex items-center justify-between gap-3 p-3 rounded-2xl flex-wrap sm:flex-nowrap"
                    style={{ background: 'var(--md-sys-color-surface-container-low)', border: '1px solid var(--md-sys-color-outline-variant)' }}
                  >
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <img src={t.logoUrl} alt={t.theatreName} className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-md" style={{ background: 'var(--md-sys-color-surface-variant)' }} />
                      <div className="flex flex-col">
                        <div className="font-medium text-sm sm:text-base" style={{ color: 'var(--md-sys-color-on-surface)' }}>{t.theatreName}</div>
                        <div className="text-xs sm:text-sm" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{t.location}</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm mt-2 sm:mt-0" style={{ background: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)' }}>Select</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                <h2 className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--md-sys-color-on-surface)' }}>Choose a seat</h2>
                <button onClick={moveBack} className="px-3 py-1 rounded-lg text-sm sm:text-base" style={{ background: 'var(--md-sys-color-surface-variant)', color: 'var(--md-sys-color-on-surface-variant)' }}>Back</button>
              </div>
              <SeatGrid />
              <div className="mt-4 flex justify-center sm:justify-end">
                <button
                  disabled={selectedSeats.length === 0}
                  onClick={moveNext}
                  className="px-4 py-2 rounded-lg font-semibold text-sm sm:text-base disabled:opacity-50"
                  style={{ background: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)' }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                <h2 className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--md-sys-color-on-surface)' }}>Summary</h2>
                <button onClick={moveBack} className="px-3 py-1 rounded-lg text-sm sm:text-base" style={{ background: 'var(--md-sys-color-surface-variant)', color: 'var(--md-sys-color-on-surface-variant)' }}>Back</button>
              </div>
              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Movie</span>
                  <span style={{ color: 'var(--md-sys-color-on-surface)' }}>{movie?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Theatre</span>
                  <span style={{ color: 'var(--md-sys-color-on-surface)' }}>{selectedTheatre?.theatreName}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Seat</span>
                  <span style={{ color: 'var(--md-sys-color-on-surface)' }}><span style={{ color: 'var(--md-sys-color-on-surface)' }}>{selectedSeats.join(', ')}</span></span>
                </div>
              </div>
              <div className="mt-6 flex justify-center sm:justify-end">
                <button onClick={handleBook} className="px-5 py-2 rounded-lg font-semibold text-sm sm:text-base" style={{ background: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)' }}>
                  Book Ticket
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default BookTicket
