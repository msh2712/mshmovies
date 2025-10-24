// src/components/BestForKids.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKidsMovies } from '../Reduxtoolkit/KidsMoviesSlice';
import { useNavigate } from 'react-router-dom';
import { setMovieId } from '../Reduxtoolkit/fetchMovieById';
import Loading from './Loading';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

function BestForKids() {
    const dispatch = useDispatch();
    const Navigates = useNavigate()
    const { movies, loading, error } = useSelector((state) => state.kids);
    const lang = useSelector((state) => state.user.language);

    useEffect(() => {
        dispatch(fetchKidsMovies(lang));
    }, [dispatch]);

     const handleshow = (id) => {
        dispatch(setMovieId(id));
         localStorage.setItem('selectedMovieId', id);
         Navigates(`/detaills/${id}`);
      };

    const selectedMovie = movies[1]; 
    {loading && (
                    <Loading/>
                )}
                 {error && (
                    <div></div>
                )}

    return (
        <div className="w-screen  bg-black dark:bg-green-50 pt-10  pb-2">
            <div className="w-[100%] md:w-[89%] ms-0 md:ms-24 h-40 md:h-72 bg-black md:rounded-lg overflow-hidden relative">
               
                {!loading && !error && selectedMovie && (
                    <div
                    onClick={()=>handleshow(selectedMovie.id)}
                        className="w-full h-full bg-cover bg-center relative"
                        style={{
                            backgroundImage: `url(${IMAGE_BASE_URL}${selectedMovie.backdrop_path})`,
                            backgroundPosition: 'top center'
                        }}
                    >
                        <h2 className="absolute text-sm md:text-3xl font-kids text-white top-4 left-4 md:top-6 md:left-6">
                            BEST ACTION MOVIES
                        </h2>

                        <div className="absolute bottom-2 right-0 font-title text-fuchsia-100 py-3 rounded-md text-sm  md:text-3xl">
                            <h2 className="font-semibold truncate w-[150px]  md:w-[300px] border-l-4 p-1 ps-6 rounded-bl-xl bg-black/10">
                                {selectedMovie.title}
                            </h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BestForKids;
