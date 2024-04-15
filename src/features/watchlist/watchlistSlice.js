import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	"bishalkar10@gmail.com": {
		name: "Bishal Kar",
		email: "bishalkar10@gmail.com",
		watchlists: [
			{
				name: "My favourite Movies",
				movies: [
					{
						Title: "Iron Man",
						Year: "2008",
						imdbID: "tt0371746",
						Type: "movie",
						Poster:
							"https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
					},
					{
						Title: "Iron Man 3",
						Year: "2013",
						imdbID: "tt1300854",
						Type: "movie",
						Poster:
							"https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg",
					},
					{
						Title: "Iron Man 2",
						Year: "2010",
						imdbID: "tt1228705",
						Type: "movie",
						Poster:
							"https://m.media-amazon.com/images/M/MV5BZGVkNDAyM2EtYzYxYy00ZWUxLTgwMjgtY2VmODE5OTk3N2M5XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
					},
					{
						Title: "The Iron Giant",
						Year: "1999",
						imdbID: "tt0129167",
						Type: "movie",
						Poster:
							"https://m.media-amazon.com/images/M/MV5BYzBjZTNkMzQtZmNkOC00Yzk0LTljMjktZjk3YWVlZjY3NTk2XkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg",
					},
				],
			},
		],
	},
};

function loadFromLocalStorage() {
	const watchlistState = JSON.parse(localStorage.getItem("watchlistState"));
	return watchlistState ? watchlistState : initialState;
}

// localStorage.setItem("watchlistState", JSON.stringify({}));
// localStorage.setItem("watchlistState", JSON.stringify(initialState));

const watchlistSlice = createSlice({
	name: "watchlistSlice",
	initialState: loadFromLocalStorage(),
	reducers: {
		addUser: (state, action) => {
			const { email, name } = action.payload;
			console.log("addUser methoded called");
			// when user is not present
			if (!state[email]) {
				state[email] = {
					name: name,
					email: email,
					watchlists: [{ name: "My Watchlist", movies: [] }],
				};
				localStorage.setItem("watchlistState", JSON.stringify(state));
			}
		},

		createWatchlist: (state, action) => {
			const { email, watchlistName } = action.payload;
			const user = state[email];
			if (user) {
				const watchlistExists = user.watchlists.some(
					(list) => list.name === watchlistName,
				);
				if (!watchlistExists) {
					user.watchlists.push({ name: watchlistName, movies: [] });
					localStorage.setItem("watchlistState", JSON.stringify(state));
				} else {
					console.log("Watchlist already exists");
				}
			}
		},

		renameWatchlist: (state, action) => {
			const { email, oldName, newName } = action.payload;
			// when renaming its gurranteed that the watchlist and user exist
			const user = state[email];
			// find the watchlist and update the name property
			user.watchlists.forEach((list) => {
				if (list.name === oldName) {
					return {
						...list,
						name: newName,
					};
				}
			});
			localStorage.setItem("watchlistState", JSON.stringify(state));
		},

		addMovie: (state, action) => {
			const { email, watchlist, movie } = action.payload;
			console.log(email, watchlist, movie);
			const user = state[email];
			if (user) {
				const watchlistIndex = user.watchlists.findIndex(
					(list) => list.name === watchlist,
				);
				if (watchlistIndex !== -1) {
					const watchlistMovies =
						state[email].watchlists[watchlistIndex].movies;
					// Check if the movie ID already exists in the watchlist
					if (!watchlistMovies.some((m) => m.imdbID === movie.imdbID)) {
						state[email].watchlists[watchlistIndex].movies.push(movie);
						// Update local storage
						localStorage.setItem("watchlistState", JSON.stringify(state));
					} else {
						console.log("Movie already exists in the watchlist.");
					}
				}
			}
		},
		removeMovie: (state, action) => {
			const { email, watchlistName, imdbID } = action.payload;
			const user = state[email];
			if (user) {
				const watchlistIndex = user.watchlists.findIndex(
					(list) => list.name === watchlistName,
				);
				if (watchlistIndex !== -1) {
					const watchlistMovies =
						state[email].watchlists[watchlistIndex].movies;
					const updatedWatchlistMovies = watchlistMovies.filter(
						(movie) => movie.imdbID !== imdbID,
					);
					state[email].watchlists[watchlistIndex].movies =
						updatedWatchlistMovies;
					// Update local storage
					localStorage.setItem("watchlistState", JSON.stringify(state));
				}
			}
		},
	},
});

export const {
	addUser,
	createWatchlist,
	renameWatchlist,
	addMovie,
	removeMovie,
} = watchlistSlice.actions;
export default watchlistSlice.reducer;
