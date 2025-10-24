import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SliderCopy from "./SliderCopy";
import { fetchPopularMovies } from "../Reduxtoolkit/PopularMoviesSlice";
import { fetchTopRatedMovies } from "../Reduxtoolkit/fetchTopRatedMovies";
import { fetchMostWatchMovies } from '../Reduxtoolkit/CartoonMoviesSlice';
import { fetchUpcomingMovies } from "./../Reduxtoolkit/UpcomingSlice";
import BestForKids from "./BestActionMovies";
import { fetchUpcomingBollywoodMovies } from '../Reduxtoolkit/Tvshows'
import { fetchSRKMovies } from "../Reduxtoolkit/SRKMoviesSlice";

function SliderMain() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.user.language);

  const { movies: popular, loading, error } = useSelector((state) => state.popularMovies);
  const { movie: topRated, load, err } = useSelector((state) => state.topRatedMovies);
  const { movies: nowPlaying, loading: nowLoad, error: nowErr } = useSelector((state) => state.nowPlayingMovies);
  const { movies: upcoming, loading: upcomingLoad, error: upcomingErr } = useSelector((state) => state.upcoming);
  const { movies: upcomingBollywood, loading: upcomingBollywoodLoad, error: upcomingBollywoodErr } = useSelector((state) => state.upcomingBollywood);
  const { movies: srkMovies, loading: srkLoading, error: srkError } = useSelector((state) => state.srk);

  useEffect(() => {
    dispatch(fetchPopularMovies(lang));
    dispatch(fetchTopRatedMovies(lang));
    dispatch(fetchMostWatchMovies(lang));
    dispatch(fetchUpcomingMovies(lang));   
    dispatch(fetchUpcomingBollywoodMovies());  
    dispatch(fetchSRKMovies());
  }, [dispatch]);

  return (
    <div>
      <SliderCopy title={"Top Rated"} movies={topRated} loading={load} error={err} />
      <SliderCopy title={"Cartoon"} movies={nowPlaying} loading={nowLoad} error={nowErr} />
      <BestForKids />
      <SliderCopy title={"Popular"} movies={popular} loading={loading} error={error} />
      <SliderCopy title={"Hollywood"} movies={upcomingBollywood} loading={upcomingBollywoodLoad} error={upcomingBollywoodErr} />
       <SliderCopy title={"Globle Star"} movies={srkMovies} loading={srkLoading} error={srkError} />
      <SliderCopy title={"Upcoming"} movies={upcoming} loading={upcomingLoad} error={upcomingErr} />
     
    </div>
  );
}


export default SliderMain;
