import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { hideBookmarkWatchlistModal } from "../features/watchlist/watchlistModalSlice.js";
import {
	createWatchlist,
	addMovie,
} from "../features/watchlist/watchlistSlice.js";

export default function watchlistModal() {
	const watchlistModalRef = useRef();
	const dispatch = useDispatch();
	const [newWatchlist, setNewWatchlist] = useState(""); // this state is used in the input field
	const [selectedWatchlist, setSelectedWatchlist] = useState(""); // this state is use for the select tag value

	const movie = useSelector((state) => state.watchlistModal.selectedMovie);
	const isOpen = useSelector((state) => state.watchlistModal.isOpen);

	useEffect(() => {
		if (isOpen) {
			watchlistModalRef.current?.showModal();
		} else {
			watchlistModalRef.current?.close();
		}
	}, [isOpen]);

	const user = useSelector((state) => state.loginModal.user);

	//
	const watchlists = useSelector(
		(state) =>
			(user && user.email && state.watchlist[user.email]?.watchlists) || [],
	);

	function closeModal(e) {
		e.preventDefault();
		dispatch(hideBookmarkWatchlistModal());
	}

	function handleSave(e) {
		e.preventDefault();
		// Check if any field is empty
		if (!user.email || !selectedWatchlist || !movie) {
			console.log("All fields must be filled");
			return;
		}
		dispatch(
			addMovie({
				email: user.email,
				watchlist: selectedWatchlist,
				movie: movie,
			}),
		);
		dispatch(hideBookmarkWatchlistModal());
	}

	const handleWatchlistChange = (event) => {
		setSelectedWatchlist(event.target.value);
	};

	function handleNewWatchlistChange(e) {
		setNewWatchlist(e.target.value);
	}

	function handleCreateWatchlist(e) {
		e.preventDefault();
		const trimmedWatchlistName = newWatchlist.trim();
		if (trimmedWatchlistName) {
			dispatch(
				createWatchlist({
					email: user.email,
					watchlistName: trimmedWatchlistName,
				}),
			);
			setNewWatchlist("");
		}
	}

	return (
		<dialog ref={watchlistModalRef}>
			<form>
				<label>
					Watchlists :
					<select value={selectedWatchlist} onChange={handleWatchlistChange}>
						<option value="">Choose a watchlist</option>
						{watchlists.map((list, index) => (
							<option key={index} value={list.name}>
								{list.name}
							</option>
						))}
					</select>
				</label>
				<div className="add-watchlist-container">
					<input
						name="watchlist"
						id="watchlist"
						type="text"
						value={newWatchlist}
						onChange={handleNewWatchlistChange}
						placeholder="My watchlist"
					/>
					<button
						aria-label="Add button"
						className="add-btn"
						onClick={handleCreateWatchlist}
					>
						<FontAwesomeIcon icon={faPlus} />
					</button>
				</div>

				<div className="button-container">
					<button className="cancel-btn" onClick={closeModal}>
						Cancel
					</button>
					<button className="save-btn" onClick={handleSave}>
						Bookmark
					</button>
				</div>
			</form>
		</dialog>
	);
}
