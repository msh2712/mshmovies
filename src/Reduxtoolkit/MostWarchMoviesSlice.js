import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMostWatchMovies = createAsyncThunk(
  'mostWatchMovies/fetchMostWatchMovies',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        'https://api.themoviedb.org/3/discover/movie?api_key=bf4a036962ea83228b010b427be3d521&with_genres=16&language=en-US&sort_by=popularity.desc'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch most watched movies');
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const mostWatchMoviesSlice = createSlice({
  name: 'mostWatchMovies',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMostWatchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMostWatchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMostWatchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mostWatchMoviesSlice.reducer;
