import React from "react";
import { useDispatch, useSelector } from "react-redux";
 import { IoHeartDislike } from "react-icons/io5";
 import { toggleLike } from "../Reduxtoolkit/likedMoviesSlice";
import { useNavigate } from "react-router-dom"
import { setMovieId } from "../Reduxtoolkit/fetchMovieById";

function LikedMoviesList() {
  const likedMovies = useSelector((state) => state.likedMovies.liked);
  const dispatch = useDispatch()
  const navigate = useNavigate()

   const handleLikeToggle = (movie) => {
      dispatch(toggleLike(movie));
    };

     const handleShow = (id) => {
        dispatch(setMovieId(id));
        localStorage.setItem("selectedMovieId", id); // you can keep this for your own logic
        navigate(`/detaills/${id}`);
      };

  if (!likedMovies.length) {
    return  <div className= "dark:bg-green-50 bg-zinc-950 text-white dark:text-black w-screen min-h-screen p-4 md:ps-24 md:pr-8 ">
      <div className="flex dark:bg-green-50 mb-6 bg-black text-green-50 dark:text-black w-[100%] rounded-lg p-3">
         <img className='size-10 me-2 md:hidden' src='./MshLogo.png' alt='Logo' />
      <h2 className="text-xl md:text-2xl font-bold pt-1 md:pt-0 md:ps-5 font-kids">LIKED MOVIES</h2>
      </div></div>
  }

  return (
    <div className= "dark:bg-green-50 bg-zinc-950 text-white dark:text-black w-screen min-h-screen p-4 md:ps-24 md:pr-8 ">
      <div className="flex dark:bg-green-50 mb-6 bg-black text-green-50 dark:text-black w-[100%] rounded-lg p-3">
         <img className='size-10 me-2 md:hidden' src='./MshLogo.png' alt='Logo' />
      <h2 className="text-xl md:text-2xl font-bold pt-1 md:pt-0 md:ps-5 font-kids">LIKED MOVIES</h2>
      </div>

      <div className="flex flex-col gap-6">
        {likedMovies.map((movie) => (
          <div
            key={movie.id}
            className="w-full relative h-[120px] md:h-[180px] bg-zinc-900  dark:bg-white rounded-lg overflow-hidden shadow-2xl hover:scale-[1.01] transition-transform duration-300 flex flex-row"
          >
            <div className="w-[25%] h-full">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-[75%] h-full p-4 flex flex-col justify-center">
              <h3 className="text-sm md:text-2xl  font-title">
                {movie.title || movie.name}
              </h3>
              <p className="text-sm md:text-lg font-des text-gray-400 mb-1">
                Release Date: {movie.release_date || "N/A"}
              </p>
              <p className="text-sm md:text-lg font-des text-gray-400">
                Rating: {movie.vote_average || "N/A"}
              </p>
              <button
               onClick={() => handleShow(movie.id)}
                className="bg-yellow-500 text-black font-kids px-4 py-2 rounded-md hover:bg-yellow-400 transition-all duration-300 text-xs md:text-base w-fit mt-2 hover:animate-pulse">
  View More
</button>
            <button  onClick={(e) => {
                    e.stopPropagation(); // prevent slide click navigation
                    handleLikeToggle(movie) }} className="absolute top-3 right-4 ">
             <IoHeartDislike className="size-5 text-red-500 hover:animate-bounce"/>
            </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LikedMoviesList;
