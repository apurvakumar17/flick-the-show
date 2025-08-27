import React from 'react'
import Navbar from '../Components/Navbar'
import MainCarousel from '../Components/MainCarousel'
import MovieList from '../Components/MovieList'
import TheatreList from '../Components/TheatreList'

function Landing() {
    return (
        <div className='flex justify-center items-center flex-col px-4'>
            <Navbar/>
            <MainCarousel/>
            <MovieList/>
            <img src="/wide_poster.avif" ></img>
            <TheatreList/>
            <a href="https://www.canva.com/design/DAGw5nqYJUk/4Yr9sG5p4CAFO0kf8OHmIg/edit?utm_content=DAGw5nqYJUk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"><button className="bg-(--md-sys-color-primary) text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 " >
                View Canva
            </button></a>
            
        </div>
    )
}

export default Landing
