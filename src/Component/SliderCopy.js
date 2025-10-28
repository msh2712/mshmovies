import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMovieId } from "../Reduxtoolkit/fetchMovieById";
import { toggleLike } from "../Reduxtoolkit/likedMoviesSlice";
import { toast } from "react-toastify";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BsHeartFill } from "react-icons/bs";

function SliderCopy({ title, movies, loading, error }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likedMovies = useSelector((state) => state.likedMovies.liked);
  const likedMovieIds = new Set(likedMovies.map((m) => m.id));

  const handleLikeToggle = (movie) => {
    const alreadyLiked = likedMovieIds.has(movie.id);
    dispatch(toggleLike(movie));
    if (alreadyLiked) {
      toast.error(`${movie.title || movie.name} removed from Like Movies`);
    } else {
      toast.success(`${movie.title || movie.name} added to Like Movies`);
    }
  };

  const handleShow = (id) => {
    dispatch(setMovieId(id));
    localStorage.setItem("selectedMovieId", id);
    navigate(`/detaills/${id}`);
  };

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="bg-black dark:bg-green-50 text-white dark:text-black ps-0 md:ps-16 pr-0 md:pr-4 relative">
      {loading ? (
  <div className="bg-black dark:bg-green-50 text-white dark:text-black ps-0 md:ps-16 pr-0 md:pr-4 relative">
    {/* Title Skeleton */}
    <div className="p-5 md:p-8">
      <div className="h-8 md:h-10 w-64 bg-gray-700 dark:bg-gray-300 rounded-md animate-pulse"></div>
    </div>

    {/* Skeleton Swiper */}
    <div className="max-w-screen-xl mx-auto px-4 relative z-0">
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={false}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="!overflow-visible"
      >
        {[...Array(5)].map((_, index) => (
          <SwiperSlide key={`skeleton-${index}`}>
            <div className="relative rounded-2xl overflow-hidden animate-pulse bg-gray-700 dark:bg-gray-300 h-72 md:h-80">
              {/* Like Button Placeholder */}
              <div className="absolute right-4 top-4 w-10 h-10 rounded-full bg-gray-600 dark:bg-gray-400" />

              {/* Title Overlay Placeholder */}
              <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-gray-800/90 via-transparent to-transparent flex items-center justify-center">
                <div className="h-4 w-3/4 bg-gray-600 dark:bg-gray-400 rounded-md"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
)  : error ? (
        <p className="text-red-500 px-6">Error: {error}</p>
      ) : (
        <>
          {movies && (
            <h2 className="text-2xl md:text-4xl font-title p-5 md:p-8">
              {title} <span className="text-red-500 ">MOVIES</span>
            </h2>
          )}

          <div className="max-w-screen-xl mx-auto px-4 relative z-0">
            <Swiper
              modules={[Navigation, Autoplay]}
              onSwiper={setSwiperInstance}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
              }}
              className="!overflow-visible"
            >
              {movies.map((movie, index) => (
                <SwiperSlide key={`${movie.id ?? "movie"}-${index}`}>
             <div
  onClick={() => handleShow(movie.id)}
  className="group relative rounded-2xl transition-all duration-300 cursor-pointer hover:scale-105"
>
  <img
    src={
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "/generic-movie-poster.jpg"
    }
    className="w-full h-72 md:h-80 rounded-2xl object-cover transition-all duration-300 group-hover:grayscale "
  />

  {/* Like Button */}
  <div
    onClick={(e) => {
      e.stopPropagation();
      handleLikeToggle(movie);
    }}
    className={`absolute right-4 top-4 z-50 flex items-center justify-center w-10 h-10 rounded-full cursor-pointer
      transition-all duration-200 ease-in-out
      ${likedMovieIds.has(movie.id)
        ? "bg-fuchsia-100/70 hover:bg-red-500 shadow-md"
        : "bg-black/40 hover:bg-gray-100 shadow-sm"}
    `}
    title={likedMovieIds.has(movie.id) ? "Unlike" : "Like"}
  >
    {likedMovieIds.has(movie.id) ? (
      <BsHeartFill className="text-red-500 text-xl animate-[pop_0.3s_ease]" />
    ) : (
      <FcLikePlaceholder className="text-amber-400 text-xl transition-transform duration-150 hover:scale-110" />
    )}
  </div>

  {/* Title Overlay */}
  <div className="absolute inset-0 flex items-end justify-center p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent">
    <h3 className="text-center text-white text-lg font-normal font-des drop-shadow-md transition-all duration-300 group-hover:text-yellow-400 group-hover:font-semibold">
      {movie.title || movie.name}
    </h3>
  </div>
</div>

                </SwiperSlide>
              ))}
            </Swiper>

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
        </>
      )}
    </div>
  );
}

export default SliderCopy;
