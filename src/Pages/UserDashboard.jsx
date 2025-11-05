import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../Components/Navbar'
import PreviousBookings from '../Components/PreviousBookings'
import ActiveTickets from '../Components/ActiveTickets'
import { useAuth } from "../context/AuthContext";
import Footer from '../Components/Footer';
import { db } from '../firebase/config'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

function UserDashboard() {
    const { user, userData } = useAuth();
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [titles, setTitles] = useState({})

    const todayStr = useMemo(() => {
        const d = new Date();
        const pad = (n) => String(n).padStart(2, '0')
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    }, [])

    useEffect(() => {
        const fetchTickets = async () => {
            if (!user) { setTickets([]); setLoading(false); return }
            try {
                setLoading(true)
                const q = query(collection(db, 'users', user.uid, 'tickets'), orderBy('createdAt', 'desc'))
                const snap = await getDocs(q)
                const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
                setTickets(items)
            } catch (e) {
                console.error('Failed to load tickets', e)
                setTickets([])
            } finally {
                setLoading(false)
            }
        }
        fetchTickets()
    }, [user])

    useEffect(() => {
        // Fetch movie titles for unique movieIds
        const loadTitles = async () => {
            const API_KEY = import.meta.env.VITE_TMDB_API_KEY
            const ids = Array.from(new Set(tickets.map(t => t.movieId).filter(Boolean)))
            const map = {}
            await Promise.all(ids.map(async (mid) => {
                try {
                    const res = await fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=${API_KEY}`)
                    if (res.ok) {
                        const data = await res.json()
                        map[mid] = data.title || String(mid)
                    } else {
                        map[mid] = String(mid)
                    }
                } catch {
                    map[mid] = String(mid)
                }
            }))
            setTitles(map)
        }
        if (tickets.length) loadTitles()
        else setTitles({})
    }, [tickets])

    const activeTickets = useMemo(() => {
        return tickets.filter(t => t.bookDate === todayStr).map(t => ({
            id: t.id,
            title: titles[t.movieId] || 'Movie',
            qrUrl: undefined,
            transactionId: t.transactionId,
            date: t.bookDate,
            time: t.showTimeDisplay || (t.showTime ? new Date(t.showTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''),
            theatreName: t.theatreName,
            movieId: t.movieId,
            seats:t.seats
        }))
    }, [tickets, titles, todayStr])

    const previousTickets = useMemo(() => {
        const older = tickets.filter(t => t.bookDate < todayStr)
            .sort((a, b) => (a.bookDate < b.bookDate ? 1 : -1))
            .slice(0, 4)
        return older.map(t => ({
            id: t.id,
            title: titles[t.movieId] || 'Movie',
            qrUrl: undefined,
            transactionId: t.transactionId,
            date: t.bookDate,
            time: t.showTimeDisplay || (t.showTime ? new Date(t.showTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''),
            theatreName: t.theatreName,
            movieId: t.movieId,
            seats:t.seats
        }))
    }, [tickets, titles, todayStr])

    return (
        <div className='flex justify-center items-center flex-col px-4  bg-(--md-sys-color-background)' >
            <Navbar></Navbar>
            <div className='container '>
                <div className='border-b border-[var(--md-sys-color-surface-container-high)]'>
                    <h1 className='text-3xl font-bold text-(--md-sys-color-on-background) my-3 text-left'>Welcome {userData?.name || "User"}</h1>
                </div>
                {!loading && <ActiveTickets tickets={activeTickets}></ActiveTickets>}
                {!loading && <PreviousBookings tickets={previousTickets}></PreviousBookings>}
            </div>
            <Footer></Footer>
        </div>
    )
}

export default UserDashboard
