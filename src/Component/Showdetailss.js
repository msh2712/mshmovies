import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById } from './../Reduxtoolkit/fetchMovieById';
import Heading from './Heading';

const ShowDetails = () => {
    const dispatch = useDispatch();
    const { selectedMovieId, movieData, loading, error } = useSelector(state => state.movie);
    const [showTrailer, setShowTrailer] = useState(false);
    const [animate, setAnimate] = useState("");

    useEffect(() => {
        let movieId = selectedMovieId;
        if (!movieId) {
            movieId = localStorage.getItem('selectedMovieId');
        }
        if (movieId) {
            dispatch(fetchMovieById(movieId));
        }

        const timer = setTimeout(() => setAnimate(movieId), 400);
        return () => clearTimeout(timer);
    }, [selectedMovieId, dispatch]);

    if (loading) return <div className="text-white bg-black h-screen w-screen text-center mt-10"></div>;
    if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;
    if (!movieData) return null;

    const video = movieData.videos?.results.find(
        v => v.site === 'YouTube' && v.type === 'Trailer'
    );

    return (
        <div
            className="relative min-h-screen text-white"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black dark:bg-green-50 dark:bg-opacity-80 bg-opacity-90"></div>
            <div>
             <div className=' relative md:hidden m-4 mb-0 opacity-100 text-xl'><Heading heading="LIKED"/></div> 
            <div className="relative md:ps-32 z-10 flex flex-col md:flex-row items-center md:items-start px-6 pb-14  md:pt-16 md:px-0 max-w-7xl mx-auto">
                
                <div
                    className={`w-full md:w-1/4 mb-6 md:mr-10 aspect-[2/3] transform transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                        }`}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                        alt={movieData.title}
                        className="rounded-lg shadow-lg w-full h-full object-cover"
                    />
                </div>

                <div className="w-full md:w-2/3 space-y-4 pr-3 mt-0 md:mt-5">
                    <h1
                        className={`text-2xl md:text-5xl font-title transform transition-all text-pink-200 dark:text-fuchsia-700 duration-700 delay-200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                    >
                        {movieData.title}
                    </h1>

                    <p
                        className={`text-lg font-des font-semibold dark:text-black text-justify leading-relaxed transform transition-all duration-700 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                    >
                        {movieData.overview}
                    </p>

                    <div
                        className={`text-sm space-y-1 mt-4 transform transition-all duration-700 delay-500  ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                    >
                        <p className='dark:text-black font-semibold'><strong className='font-kids'>Release Date :</strong> {movieData.release_date}</p>
                        <p className='dark:text-black font-semibold '><strong className='font-kids'>Genres :</strong> {movieData.genres.map(g => g.name).join(', ')}</p>
                        <p className='dark:text-black font-semibold '><strong className='font-kids'>Runtime :</strong> {movieData.runtime} minutes</p>
                        <p className='dark:text-black font-semibold '><strong className='font-kids'>Rating :</strong> {movieData.vote_average} / 10</p>
                        <p className='dark:text-black font-semibold '><strong className='font-kids'>Votes :</strong> {movieData.vote_count.toLocaleString()}</p>

                        {movieData.production_companies.length > 0 && (
                            <p className='dark:text-black font-semibold'>
                                <strong className='font-kids'>Production Companies :</strong>{' '}
                                {movieData.production_companies.map(company => company.name).join(', ')}
                            </p>
                        )}

                        {movieData.production_countries.length > 0 && (
                            <p className='dark:text-black font-semibold'>
                                <strong className='font-kids'>Production Countries :</strong>{' '}
                                {movieData.production_countries.map(country => country.name).join(', ')}
                            </p>
                        )}
                    </div>
                    {video && (
                        <div
                            className={`mt-6 transform transition-all duration-700 delay-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                                }`}
                        >
                            <button
                                onClick={() => setShowTrailer(true)}
                                className="bg-yellow-600 hover:bg-yellow-700 font-kids text-white px-5 py-2 rounded-md transition"
                            >
                                Watch Trailer
                            </button>
                        </div>
                    )}
                </div>
            </div>
            </div>

            {showTrailer && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
                    <div className="w-full flex justify-end p-4 z-50">
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="text-white text-3xl hover:text-red-500 transition"
                            aria-label="Close Trailer"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="flex-1 relative">
                        <iframe
                            src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
                            title="YouTube trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowDetails;
