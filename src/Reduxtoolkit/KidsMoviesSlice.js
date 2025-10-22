// src/Reduxtoolkit/KidsMoviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://api.themoviedb.org/3/tv/popular?api_key=bf4a036962ea83228b010b427be3d521';

export const fetchKidsMovies = createAsyncThunk(
  'kids/fetchKidsMovies',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const KidsMoviesSlice = createSlice({
  name: 'kids',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKidsMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKidsMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchKidsMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default KidsMoviesSlice.reducer;
