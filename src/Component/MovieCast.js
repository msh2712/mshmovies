import React, { useEffect, useState } from 'react';

const MovieCast = ({ selectedMovieId, animate }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  const movieId = selectedMovieId || localStorage.getItem('selectedMovieId');
  const API_KEY = 'bf4a036962ea83228b010b427be3d521';

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setCast(data.cast.slice(0, 6)); // limiting to first 6 cast members
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cast:', error);
        setLoading(false);
      }
    };

    if (movieId) fetchCast();
  }, [movieId]);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading cast...</p>;
  if (!cast.length)
    return <p className="text-center text-gray-500 mt-10">No cast found.</p>;

  return (
    <div
      className={`grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 pt-6 transform transition-all duration-700 delay-1000 ${
        animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {cast.map((member) => (
<div
  key={member.id}
  className="group w-full rounded-xl overflow-hidden border border-transparent 
             transform hover:-translate-y-1 transition-all duration-300 cursor-pointer
             bg-white dark:bg-black"
>


  <img
    className="w-full h-28 object-cover  filter group-hover:grayscale"
    src={
      member.profile_path
        ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
        : '/user.png'
    }
    alt={member.name}
  />
  <div className="p-2 text-center">
    <h4 className="text-gray-900 font-des dark:text-gray-100 font-semibold text-sm truncate">
      {member.name}
    </h4>
    <p className="text-gray-500 font-thin dark:text-gray-400 text-xs truncate">{member.character}</p>
  </div>

  <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
       style={{
         boxShadow: '0 8px 20px rgba(255,0,0,0.5)',
       }}
  ></div>
</div>



      ))}
    </div>
  );
};

export default MovieCast;
