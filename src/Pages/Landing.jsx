import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import MainCarousel from '../Components/MainCarousel'
import MovieList from '../Components/MovieList'
import TheatreList from '../Components/TheatreList'
import Footer from '../Components/Footer'
import Carousel from '../Components/MovieList_Mobile'

function Landing() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Tailwind md = 768px
        };

        handleResize(); // check on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className='flex justify-center items-center flex-col px-4 bg-(--md-sys-color-background)'>
            <Navbar />
            <MainCarousel />
            {isMobile ? <Carousel
                baseWidth={300}
                autoplay={true}
                autoplayDelay={1500}
                pauseOnHover={true}
                loop={true}
                round={false}
            /> : <MovieList />}
            {/* <MovieList /> */}
            <img src="/wide_poster.jpg" ></img>
            <TheatreList />
            {/* <a href="https://www.canva.com/design/DAGw5nqYJUk/4Yr9sG5p4CAFO0kf8OHmIg/edit?utm_content=DAGw5nqYJUk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"><button className="bg-(--md-sys-color-primary) text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 " >
                View Canva
            </button></a> */}
            <Footer />
        </div>
    )
}

export default Landing
