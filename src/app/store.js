import { configureStore } from "@reduxjs/toolkit";
import loginModalReducer from "../features/loginModal/loginModalSlice";
import watchlistReducer from "../features/watchlist/watchlistSlice";
import watchlistModalReducer from "../features/watchlist/watchlistModalSlice";

export default configureStore({
	reducer: {
		loginModal: loginModalReducer,
		watchlist: watchlistReducer,
		watchlistModal: watchlistModalReducer,
	},
});
