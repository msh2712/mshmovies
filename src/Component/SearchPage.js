import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi"; // Search icon
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMovieId } from "../Reduxtoolkit/fetchMovieById";

const API_KEY = "bf4a036962ea83228b010b427be3d521";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef(null);
    const dispatch = useDispatch()
  const Navigates = useNavigate()

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setIsLoading(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results || []);
        })
        .catch((err) => console.error("Error:", err))
        .finally(() => setIsLoading(false));
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

   const handleshow = (id) => {
      dispatch(setMovieId(id));
       localStorage.setItem('selectedMovieId', id);
      Navigates(`/detaills/${id}`);
    };

  return (
    <div className="min-h-screen w-screen dark:bg-green-50 bg-zinc-950 text-white flex flex-col items-center pt-10 px-4">
      {/* Logo */}
      <div className="text-3xl font-bold mb-5 text-blue-400">
        <img className="size-36" src="./MshLogo.png" alt="Logo" />
      </div>

      {/* Search input with icon */}
      <div className="relative w-full max-w-2xl mb-6">
        <input
          type="text"
          placeholder="Search your favorite movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full font-kids p-2 ps-6 pr-12 rounded-xl bg-zinc-800 text-gray-100 outline-none focus:ring-2 focus:ring-white"
        />
        <FiSearch className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 text-xl pointer-events-none" />
      </div>

      <div className="w-full max-w-md  md:max-w-xl overflow-y-auto max-h-[70vh] md:max-h-[50vh] space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {isLoading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : results.length > 0 ? (
          results.map((movie) => (
            <div
              key={movie.id}
              onClick={()=>handleshow(movie.id)}
              className="flex items-center gap-4 bg-black/10 hover:bg-white/20 transition rounded-lg p-2"
            >
              <img
                src={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : "https://via.placeholder.com/50x75?text=No+Image"
                }
                alt={movie.title}
                className="w-[40px] h-[40px] object-cover rounded-md"
              />
              <div>
                <p className="text-white text-sm dark:text-black font-medium">{movie.title}</p>
                <p className="text-gray-400 text-xs">
                  {movie.release_date || "—"}
                </p>
              </div>
            </div>
          ))
        ) : query.trim() !== "" ? (
          <p className="text-gray-400 text-center">No results found</p>
        ) : (
          <p className="text-gray-600 text-center">
            
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
