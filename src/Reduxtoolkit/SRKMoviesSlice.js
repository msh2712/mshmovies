import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch SRK movies
export const fetchSRKMovies = createAsyncThunk(
  'srkMovies/fetchSRKMovies',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/35742/movie_credits?api_key=bf4a036962ea83228b010b427be3d521`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch SRK movies');
      }

      const data = await response.json();
      return data.cast; // 'cast' array contains movies he acted in
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const SRKMoviesSlice = createSlice({
  name: 'srkMovies',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSRKMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSRKMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchSRKMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default SRKMoviesSlice.reducer;
