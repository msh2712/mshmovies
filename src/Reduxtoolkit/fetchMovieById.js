// src/redux/movieSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMovieById = createAsyncThunk(
  'movie/fetchMovieById',
  async (id, thunkAPI) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=bf4a036962ea83228b010b427be3d521&append_to_response=videos`
      );
      const data = await res.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    selectedMovieId: null,
    movieData: null,
    loading: false,
    error: null
  },
  reducers: {
    setMovieId: (state, action) => {
      state.selectedMovieId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.movieData = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.movieData = action.payload;
        console.log(state.movieData)
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setMovieId } = movieSlice.actions;
export default movieSlice.reducer;
