import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovieId } from "../Reduxtoolkit/fetchMovieById";
import { toggleLike } from "../Reduxtoolkit/likedMoviesSlice";

function SliderCopy({ title, movies, loading, error }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get liked movies from Redux state
  const likedMovies = useSelector((state) => state.likedMovies.liked);

  // Check if a movie is liked by its id
  const isMovieLiked = (movieId) => likedMovies.some((m) => m.id === movieId);

  // Toggle like/unlike a movie
  const handleLikeToggle = (movie) => {
    dispatch(toggleLike(movie));
  };

  const handleShow = (id) => {
    dispatch(setMovieId(id));
    localStorage.setItem("selectedMovieId", id); // you can keep this for your own logic
     navigate(`/detaills/${id}`);
  };

  if (loading) return <p className="text-white px-6">Loading...</p>;
  if (error) return <p className="text-red-500 px-6">Error: {error}</p>;

  return (
    <div className="bg-black  dark:bg-green-50 text-white dark:text-black ps-0 md:ps-16 pr-0 md:pr-4 relative">
      {movies && (
        <h2 className="text-2xl md:text-4xl font-title p-5 md:p-8">
          {title} <span className="text-red-500">MOVIES</span>
        </h2>
      )}

      <div className="max-w-screen-xl mx-auto px-4 relative z-0">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="!overflow-visible"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div
                onClick={() => handleShow(movie.id)}
                className="group relative rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 md:h-80 rounded-2xl object-cover transition-all duration-300 group-hover:grayscale"
                />

                {/* Like Button */}
                <div
                  onClick={(e) => {
                    e.stopPropagation(); // prevent slide click navigation
                    handleLikeToggle(movie);
                  }}
                  className="absolute right-4 top-4 text-xl cursor-pointer z-50"
                  title={isMovieLiked(movie.id) ? "Unlike" : "Like"}
                >
                  {isMovieLiked(movie.id) ? (
                    <BsHeartFill className="text-red-500 animate-[spin_4s_linear_infinite]" />
                  ) : (
                    <FcLikePlaceholder />
                  )}
                </div>

                {/* Movie Title Overlay */}
                <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-black/90">
                  <h3 className="text-center text-white text-lg font-des drop-shadow-md">
                    {movie.title || movie.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <div
          ref={prevRef}
          className="hidden md:flex items-center justify-center absolute z-50 top-1/2 -translate-y-1/2 left-6 w-10 h-10 bg-black/50 text-white rounded-full cursor-pointer hover:bg-black"
        >
          <FaArrowLeft />
        </div>
        <div
          ref={nextRef}
          className="hidden md:flex items-center justify-center absolute z-50 top-1/2 -translate-y-1/2 right-6 w-10 h-10 bg-black/50 text-white rounded-full cursor-pointer hover:bg-black"
        >
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
}

export default SliderCopy;
