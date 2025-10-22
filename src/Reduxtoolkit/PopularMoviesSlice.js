// src/Reduxtoolkit/PopularMoviesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPopularMovies = createAsyncThunk(
  'popularMovies/fetchPopularMovies',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=bf4a036962ea83228b010b427be3d521'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
      }

      const data = await response.json();
      return data.results;
      console.log(data)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const PopularMoviesSlice = createSlice({
  name: 'popularMovies',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PopularMoviesSlice.reducer;
