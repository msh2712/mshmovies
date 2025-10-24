import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'bf4a036962ea83228b010b427be3d521';

export const fetchUpcomingBollywoodMovies = createAsyncThunk(
  'upcomingBollywood/fetchUpcomingBollywoodMovies',
  async (_, thunkAPI) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch Bollywood TV shows');
      }
      const data = await response.json();

      // Bas data.results ko return karo bina kisi change ke
      return data.results;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const UpcomingBollywoodSlice = createSlice({
  name: 'upcomingBollywood',
  initialState: {
    movies: [],      // yeh wahi array rahega jisme TV shows store honge
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingBollywoodMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingBollywoodMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;  // bina kisi modification ke store kar do
      })
      .addCase(fetchUpcomingBollywoodMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default UpcomingBollywoodSlice.reducer;
