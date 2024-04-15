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
		// Adds a new user to the state along with a default watchlist if the user doesn't already exist
		addUser: (state, action) => {
			const { email, name } = action.payload;
			console.log("addUser method called");
			if (!state[email]) {
				state[email] = {
					name: name,
					email: email,
					watchlists: [{ name: "My Watchlist", movies: [] }],
				};
				// Update local storage with the new user data
				localStorage.setItem("watchlistState", JSON.stringify(state));
			}
		},

		// Creates a new watchlist for a user if it doesn't already exist
		createWatchlist: (state, action) => {
			const { email, watchlistName } = action.payload;
			const user = state[email];
			if (user) {
				const watchlistExists = user.watchlists.some(
					(list) => list.name === watchlistName,
				);
				if (!watchlistExists) {
					// Add the new watchlist to the user's watchlists
					user.watchlists.push({ name: watchlistName, movies: [] });
					// Update local storage with the updated state
					localStorage.setItem("watchlistState", JSON.stringify(state));
				} else {
					console.log("Watchlist already exists");
				}
			}
		},

		// Renames an existing watchlist for a user
		renameWatchlist: (state, action) => {
			const { email, oldName, newName } = action.payload;
			const user = state[email];
			if (user) {
				// Find the watchlist to rename and update its name
				user.watchlists.forEach((list) => {
					if (list.name === oldName) {
						list.name = newName;
					}
				});
				// Update local storage with the updated state
				localStorage.setItem("watchlistState", JSON.stringify(state));
			}
		},

		// Adds a movie to a specific watchlist for a user
		addMovie: (state, action) => {
			const { email, watchlist, movie } = action.payload;
			const user = state[email];
			if (user) {
				const watchlistIndex = user.watchlists.findIndex(
					(list) => list.name === watchlist,
				);
				if (watchlistIndex !== -1) {
					const watchlistMovies = user.watchlists[watchlistIndex].movies;
					// Check if the movie already exists in the watchlist
					if (!watchlistMovies.some((m) => m.imdbID === movie.imdbID)) {
						// Add the movie to the watchlist
						watchlistMovies.push(movie);
						// Update local storage with the updated state
						localStorage.setItem("watchlistState", JSON.stringify(state));
					} else {
						console.log("Movie already exists in the watchlist.");
					}
				}
			}
		},

		// Removes a movie from a specific watchlist for a user
		removeMovie: (state, action) => {
			const { email, watchlistName, imdbID } = action.payload;
			const user = state[email];
			if (user) {
				const watchlistIndex = user.watchlists.findIndex(
					(list) => list.name === watchlistName,
				);
				if (watchlistIndex !== -1) {
					// Filter out the movie to remove from the watchlist
					user.watchlists[watchlistIndex].movies = user.watchlists[
						watchlistIndex
					].movies.filter((movie) => movie.imdbID !== imdbID);
					// Update local storage with the updated state
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
