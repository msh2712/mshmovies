import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SliderCopy from "./SliderCopy";
import { fetchPopularMovies } from "../Reduxtoolkit/PopularMoviesSlice";
import { fetchTopRatedMovies } from "../Reduxtoolkit/fetchTopRatedMovies";
import { fetchMostWatchMovies } from './../Reduxtoolkit/MostWarchMoviesSlice';
import { fetchUpcomingMovies } from "./../Reduxtoolkit/UpcomingSlice"
import BestForKids from "./BestForKids";

function SliderMain() {
  const dispatch = useDispatch();

  const { movies: popular, loading, error } = useSelector((state) => state.popularMovies);
  const { movie: topRated, load, err } = useSelector((state) => state.topRatedMovies);
  const { movies: nowPlaying, loading: nowLoad, error: nowErr } = useSelector((state) => state.nowPlayingMovies);
const { movies: upcoming, loading: upcomingLoad, error: upcomingErr } = useSelector(
  (state) => state.upcoming
);

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchMostWatchMovies());
    dispatch(fetchUpcomingMovies()); // ✅ New dispatch
  }, [dispatch]);

  return (
    <div>
      <SliderCopy
        title={"Trending "}
        movies={popular}
        loading={loading}
        error={error}
      />
      <BestForKids />
      <SliderCopy
        title={"Top Rated "}
        movies={topRated}
        loading={load}
        error={err}
      />
      <SliderCopy
        title={"Most Watch "}
        movies={nowPlaying}
        loading={nowLoad}
        error={nowErr}
      />
      <SliderCopy
        title={"Upcoming "}
        movies={upcoming}
        loading={upcomingLoad}
        error={upcomingErr}
      />
    </div>
  );
}

export default SliderMain;
