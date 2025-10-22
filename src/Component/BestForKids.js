// src/components/BestForKids.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKidsMovies } from '../Reduxtoolkit/KidsMoviesSlice';
import { useNavigate } from 'react-router-dom';
import { setMovieId } from '../Reduxtoolkit/fetchMovieById';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

function BestForKids() {
    const dispatch = useDispatch();
    const Navigates = useNavigate()
    const { movies, loading, error } = useSelector((state) => state.kids);

    useEffect(() => {
        dispatch(fetchKidsMovies());
    }, [dispatch]);

     const handleshow = (id) => {
        dispatch(setMovieId(id));
         localStorage.setItem('selectedMovieId', id);
        Navigates('/detaills');
      };

    const selectedMovie = movies[0]; 
    {loading && (
                    <div className="flex items-center justify-center h-full text-white">Loading...</div>
                )}
                 {error && (
                    <div className="text-red-500 p-4">Error: {error}</div>
                )}

    return (
        <div className="w-screen  bg-black dark:bg-green-50 pt-10 pb-2">
            <div className="w-[100%] md:w-[89%] ms-0 md:ms-24 h-72 bg-black rounded-lg overflow-hidden relative">
               
                {!loading && !error && selectedMovie && (
                    <div
                    onClick={()=>handleshow(selectedMovie.id)}
                        className="w-full h-full bg-cover bg-center relative"
                        style={{
                            backgroundImage: `url(${IMAGE_BASE_URL}${selectedMovie.backdrop_path})`,
                        }}
                    >
                        <h2 className="absolute text-sm md:text-3xl font-kids text-white top-4 left-4 md:top-6 md:left-6">
                            BEST FOR ACTION 
                        </h2>

                        <div className="absolute bottom-2 right-0 font-title text-fuchsia-100 py-3 rounded-md text-sm  md:text-3xl">
                            <h2 className="font-semibold truncate w-[200px]  md:w-[300px] border-l-4 p-1 ps-6 rounded-bl-xl bg-black/10">
                                {selectedMovie.name}
                            </h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BestForKids;
