import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'bf4a036962ea83228b010b427be3d521';
const API_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const fetchUpcomingMovies = createAsyncThunk(
  'upcoming/fetchUpcomingMovies',
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

const UpcomingSlice = createSlice({
  name: 'upcoming',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default UpcomingSlice.reducer;
