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
import mostWatchMoviesReducer from './../Reduxtoolkit/CartoonMoviesSlice';
import KidsMoviesReducer from './../Reduxtoolkit/KidsMoviesSlice';
import movieReducer from './../Reduxtoolkit/fetchMovieById';
import likedMoviesReducer from './../Reduxtoolkit/likedMoviesSlice';
import sidebarReducer from './../Reduxtoolkit/sidebarSlice';
import UpcomingBollywoodReducer from './Tvshows';
import userReducer from './../Reduxtoolkit/userSlice'; // <-- Import user slice
import SRKMoviesreducer from './SRKMoviesSlice'

const likedMoviesPersistConfig = {
  key: 'likedMovies',
  storage,
};

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['users',  'usernames', 'currentUser', 'language', 'isAuthenticated'], 
};


const rootReducer = combineReducers({
  upcomingBollywood: UpcomingBollywoodReducer,
  upcoming: UpcomingReducer,
  popularMovies: PopularMoviesReducer,
  topRatedMovies: topRatedMoviesReducer,
  nowPlayingMovies: mostWatchMoviesReducer,
  kids: KidsMoviesReducer,
  movie: movieReducer,
  likedMovies: persistReducer(likedMoviesPersistConfig, likedMoviesReducer),
  sidebar: sidebarReducer,
  user: persistReducer(userPersistConfig, userReducer), 
  srk : SRKMoviesreducer 
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
