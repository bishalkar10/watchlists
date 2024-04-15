import { createSlice } from "@reduxjs/toolkit";

export const loginModalSlice = createSlice({
	name: "loginModal",
	initialState: {
		isOpen: false,
		user: loadUserFromLocalStorage(), // Load user from local storage when the app initializes
	},

	reducers: {
		showLoginModal: (state) => {
			state.isOpen = true;
		},
		hideLoginModal: (state) => {
			state.isOpen = false;
		},
		login: (state, action) => {
			const { name, email } = action.payload;
			state.user = { name, email };
			localStorage.setItem("user", JSON.stringify(state.user)); // Save user to local storage when logged in
		},
		logout: (state) => {
			state.user = { name: "", email: "" };
			localStorage.removeItem("user"); // Clear user from local storage when logged out
		},
	},
});

export const { showLoginModal, hideLoginModal, login, logout } =
	loginModalSlice.actions;
export default loginModalSlice.reducer;

// Function to load user from local storage
function loadUserFromLocalStorage() {
	const user = localStorage.getItem("user");
	return user ? JSON.parse(user) : { name: "", email: "" };
}
