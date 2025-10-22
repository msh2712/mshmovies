// store.js or wherever you configure Redux store

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import UpcomingReducer from './../Reduxtoolkit/UpcomingSlice';
import PopularMoviesReducer from './../Reduxtoolkit/PopularMoviesSlice';
import topRatedMoviesReducer from './../Reduxtoolkit/fetchTopRatedMovies';
import mostWatchMoviesReducer from './../Reduxtoolkit/MostWarchMoviesSlice';
import KidsMoviesReducer from './../Reduxtoolkit/KidsMoviesSlice';
import movieReducer from './../Reduxtoolkit/fetchMovieById';
import likedMoviesReducer from './../Reduxtoolkit/likedMoviesSlice';
import sidebarReducer from './../Reduxtoolkit/sidebarSlice'

// Only persist likedMovies
const likedMoviesPersistConfig = {
  key: 'likedMovies',
  storage,
};

const rootReducer = combineReducers({
  upcoming: UpcomingReducer,
  popularMovies: PopularMoviesReducer,
  topRatedMovies: topRatedMoviesReducer,
  nowPlayingMovies: mostWatchMoviesReducer,
  kids: KidsMoviesReducer,
  movie: movieReducer,
  likedMovies: persistReducer(likedMoviesPersistConfig, likedMoviesReducer),

  sidebar: sidebarReducer, // ✅ added here
});

const Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(Store);

export { Store, persistor };
