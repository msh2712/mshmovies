// src/Reduxtoolkit/TopRatedMoviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTopRatedMovies = createAsyncThunk(
  'topRatedMovies/fetchTopRatedMovies',
  async (lang, thunkAPI) => {
    console.log(lang);
    
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=bf4a036962ea83228b010b427be3d521&sort_by=vote_average.desc&with_original_language=${lang}&vote_count.gte=100&language=en`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch top-rated movies');
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const TopRatedMoviesSlice = createSlice({
  name: 'topRatedMovies',
  initialState: {
    movie: [],
    load: false,
    err: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.load = true;
        state.err = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.load = false;
        state.movie = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.load = false;
        state.err = action.payload;
      });
  },
});

export default TopRatedMoviesSlice.reducer;
