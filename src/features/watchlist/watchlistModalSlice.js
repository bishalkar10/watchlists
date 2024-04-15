import { createSlice } from "@reduxjs/toolkit";

const watchlistModalSlice = createSlice({
	name: "watchlistModal",
	initialState: {
		isOpen: false,
		selectedMovie: null, // Store selected movie data here
	},
	reducers: {
		showBookmarkWatchlistModal: (state) => {
			state.isOpen = true;
		},
		hideBookmarkWatchlistModal: (state) => {
			state.isOpen = false;
		},
		setSelectedMovie: (state, action) => {
			state.selectedMovie = action.payload;
		},
	},
});

export const {
	showBookmarkWatchlistModal,
	hideBookmarkWatchlistModal,
	setSelectedMovie,
} = watchlistModalSlice.actions;
export default watchlistModalSlice.reducer;
