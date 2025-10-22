import { createSlice } from "@reduxjs/toolkit";

const likedMoviesSlice = createSlice({
  name: "likedMovies",
  initialState: {
    liked: [],
  },
  reducers: {
    toggleLike: (state, action) => {
      const movie = action.payload;
      const exists = state.liked.some((m) => m.id === movie.id);
      
      if (exists) {
        state.liked = state.liked.filter((m) => m.id !== movie.id);
        console.log(state.liked)
      } else {
        state.liked.push(movie);
      }
    },
  },
});

export const { toggleLike } = likedMoviesSlice.actions;
export default likedMoviesSlice.reducer;
