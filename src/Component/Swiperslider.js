import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { fetchUpcomingMovies } from '../Reduxtoolkit/UpcomingSlice'
import 'swiper/css'
import 'swiper/css/navigation'
import { FaArrowLeft, FaArrowRight, FaRegCalendarAlt, FaStar } from 'react-icons/fa'
import Loading from './Loading'
import { setMovieId } from "../Reduxtoolkit/fetchMovieById";
import { useNavigate } from 'react-router-dom'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

export default function AnimatedSwiper() {
  const dispatch = useDispatch()
  const { movies: upcoming, loading: upcomingLoad, error: upcomingErr } = useSelector((state) => state.upcoming);
  const lang = useSelector((state) => state.user.language);
  
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  useEffect(() => {
     dispatch(fetchUpcomingMovies(lang));
  }, [dispatch, lang])
  
  const handleShow = (id) => {
      dispatch(setMovieId(id));
      localStorage.setItem("selectedMovieId", id); 
      navigate(`/detaills/${id}`);
  };

  if (upcomingLoad) return <Loading/>
  if (upcomingErr) return <div className="text-red-500 p-5">Error: {upcomingErr}</div>

  const filteredMovies = upcoming.filter(movie => movie.backdrop_path);

  return (
    <div className="relative dark:bg-white">
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        className="overflow-hidden"
      >
        {filteredMovies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-[400px] sm:h-[500px] md:h-[500px] lg:h-screen">
              <div
                className="w-full h-full bg-cover bg-center brightness-75"
                style={{
                  backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
                }}
              ></div>

              <div className="absolute bottom-12 md:bottom-[120px] left-10 md:left-40 text-white max-w-2xl rounded-md">
                <h2
                  className={`text-3xl md:text-6xl font-title transition-all duration-700 ${
                    activeIndex === index
                      ? 'opacity-100 translate-y-0 delay-100'
                      : 'opacity-0 translate-y-5 pointer-events-none'
                  }`}
                >
                  {movie.title}
                </h2>

                <div
                  className={`flex items-center space-x-3 transition-all duration-700 ${
                    activeIndex === index
                      ? 'opacity-100 translate-y-0 delay-300'
                      : 'opacity-0 translate-y-5 pointer-events-none'
                  }`}
                >
                  <FaRegCalendarAlt className="text-sm md:text-xl" />
                  <p className="text-lg font-title md:text-xl">{movie.release_date}</p>
                </div>

                <div
                  className={`flex items-center space-x-2 mb-2 md:mb-4 transition-all duration-700 ${
                    activeIndex === index
                      ? 'opacity-100 translate-y-0 delay-500'
                      : 'opacity-0 translate-y-5 pointer-events-none'
                  }`}
                >
                  <FaStar className="text-yellow-400 text-lg" />
                  <p className="text-lg pl-1 font-title md:text-xl">{movie.vote_average}</p>
                </div>

                <button
                  onClick={() => handleShow(movie.id)}
                  type="button"
                  className={`bg-yellow-500 text-black font-kids px-5 py-2 rounded-md hover:bg-yellow-500 transition text-sm md:text-xl hover:animate-pulse transition-all duration-700 ${
                    activeIndex === index
                      ? 'opacity-100 translate-y-0 delay-700'
                      : 'opacity-0 translate-y-5 pointer-events-none'
                  }`}
                >
                  View More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        ref={prevRef}
        className="swiper-button-prev-custom absolute bottom-5 md:bottom-10 right-[100px] md:right-[150px] transform -translate-y-1/2 z-10 cursor-pointer text-white bg-black/50 p-3 rounded-full hover:bg-black"
      >
        <FaArrowLeft />
      </div>
      <div
        ref={nextRef}
        className="swiper-button-next-custom absolute bottom-5 md:bottom-10 right-[50px] md:right-[90px] transform -translate-y-1/2 z-10 cursor-pointer text-white bg-black/50 p-3 rounded-full hover:bg-black"
      >
        <FaArrowRight />
      </div>
    </div>
  )
}
