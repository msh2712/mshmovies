// src/Reduxtoolkit/KidsMoviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchKidsMovies = createAsyncThunk(
  'kids/fetchKidsMovies',
  async (lang, thunkAPI) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=bf4a036962ea83228b010b427be3d521&with_original_language=${lang}&with_genres=28`);

      // Check if response is OK (status in the 200-299 range)
      if (!response.ok) {
        // You can provide a more detailed error message including status
        throw new Error(`Failed to fetch kids movies: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      // Pass error message to rejected action
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
