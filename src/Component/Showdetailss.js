import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieById } from './../Reduxtoolkit/fetchMovieById';
import Heading from './Heading';
import Loading from './Loading';
import MovieCast from './MovieCast';

const ShowDetails = () => {
    const dispatch = useDispatch();
    const { selectedMovieId, movieData, loading, error } = useSelector(state => state.movie);
    const [showTrailer, setShowTrailer] = useState(false);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        let movieId = selectedMovieId || localStorage.getItem('selectedMovieId');

        if (movieId) {
            dispatch(fetchMovieById(movieId));
            setAnimate(false);  
            const timer = setTimeout(() => setAnimate(true), 400);
            return () => clearTimeout(timer);
        }
    }, [selectedMovieId, dispatch]);

    if (loading) return <Loading />;
    if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

    if (!movieData) return <div className="text-center mt-10 text-white">No movie selected</div>;

    // Defensive checks - default empty arrays if undefined
    const genres = Array.isArray(movieData.genres) ? movieData.genres : [];
    const productionCompanies = Array.isArray(movieData.production_companies) ? movieData.production_companies : [];
    const productionCountries = Array.isArray(movieData.production_countries) ? movieData.production_countries : [];
    const videos = movieData.videos?.results ?? [];

    const trailerVideo = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer');

    return (
        <div
            className="relative min-h-screen text-white"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-90 dark:bg-green-50 dark:bg-opacity-80"></div>

            <div>
                <div className='relative md:hidden m-4 mb-0 opacity-100 text-xl'>
                    <Heading heading="LIKED" />
                </div>

                <div className="relative md:ps-32 z-10 flex flex-col md:flex-row items-center md:items-start px-6 pb-14 md:pt-16 md:px-0 max-w-7xl mx-auto">

                    <div
                        className={`w-full md:w-1/4 mb-6 md:mr-10 aspect-[2/3] transform transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                            }`}
                    >
                        <img
                            src={
                                movieData.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                                    : '/hindi.jpg'  // path to local image in public folder
                            }
                            alt={movieData.title || 'Movie poster'}
                            className="rounded-lg shadow-lg w-full h-full object-cover"
                        />

                    </div>

                    <div className="w-full md:w-2/3 space-y-4 md:pr-3  mt-0 md:mt-5">
                        <h1
                            className={`text-2xl md:text-5xl font-title transform transition-all text-pink-200 dark:text-fuchsia-700 duration-700 delay-200 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                                }`}
                        >
                            {movieData.title || 'No title available'}
                        </h1>

                        <p
                            className={`text-lg font-des font-semibold dark:text-black text-justify leading-relaxed transform transition-all duration-700 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                                }`}
                        >
                            {movieData.overview || 'No overview available.'}
                        </p>

                        <div
                            className={`text-sm space-y-1 mt-4 transform transition-all duration-700 delay-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                                }`}
                        >
                            <p className='dark:text-black font-semibold'><strong>Release Date :</strong> {movieData.release_date || 'N/A'}</p>
                            <p className='dark:text-black font-semibold'><strong>Genres :</strong> {genres.length > 0 ? genres.map(g => g.name).join(', ') : 'N/A'}</p>
                            <p className='dark:text-black font-semibold'><strong>Runtime :</strong> {movieData.runtime ? `${movieData.runtime} minutes` : 'N/A'}</p>
                            <p className='dark:text-black font-semibold'><strong>Rating :</strong> {movieData.vote_average ? `${movieData.vote_average} / 10` : 'N/A'}</p>
                            <p className='dark:text-black font-semibold'><strong>Votes :</strong> {movieData.vote_count ? movieData.vote_count.toLocaleString() : 'N/A'}</p>

                            {productionCompanies.length > 0 && (
                                <p className='dark:text-black font-semibold'>
                                    <strong>Production Companies :</strong> {productionCompanies.map(company => company.name).join(', ')}
                                </p>
                            )}

                            {productionCountries.length > 0 && (
                                <p className='dark:text-black font-semibold'>
                                    <strong>Production Countries :</strong> {productionCountries.map(country => country.name).join(', ')}
                                </p>
                            )}
                        </div>

                        {trailerVideo && (
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

                       <MovieCast animate={animate} selectedMovieId={selectedMovieId} />

                    </div>
                    
                </div>
            </div>

            {showTrailer && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-0 md:p-4">
                    <button
                        onClick={() => setShowTrailer(false)}
                        className="fixed top-4 right-4 z-60 text-white text-4xl font-bold bg-black bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition md:static md:absolute md:top-3 md:right-3"
                        aria-label="Close Trailer"
                    >
                        ✕
                    </button>

                    <div className="relative w-full h-full md:w-full md:max-w-4xl md:aspect-video rounded-none md:rounded-lg shadow-lg bg-black">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
                            title="YouTube trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-none md:rounded-lg"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowDetails;
