import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = 'bf4a036962ea83228b010b427be3d521';

// Calculate last 10 days range
const today = new Date();
const past10Days = new Date();
past10Days.setDate(today.getDate() - 10);

const formatDate = (date) => date.toISOString().split("T")[0];

export const fetchUpcomingMovies = createAsyncThunk(
  'upcoming/fetchUpcomingMovies',
  async (lang, thunkAPI) => {
    try {
      let allMovies = [];
      let page = 1;
      const totalPages = 2; // To cover roughly 40 movies if 20 per page

      while (page <= totalPages) {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${lang}&primary_release_date.gte=${formatDate(past10Days)}&primary_release_date.lte=${formatDate(today)}&sort_by=primary_release_date.asc&page=${page}`);
        const data = await response.json();
        allMovies = allMovies.concat(data.results);
        page++;
      }

      return allMovies; 
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
