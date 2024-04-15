import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";

function WatchList() {
	const { name } = useParams();
	const user = useSelector((state) => state.loginModal.user);

	const movies = useSelector(
		(state) =>
			state.watchlist[user.email]?.watchlists.find((list) => list.name === name)
				?.movies || [],
	);

	return (
		<main id="watchlist-page">
			<h2 className="name">{name}</h2>
			<p className="about"> About this watchlist</p>
			<p className="summary">This list loren ipsum dolor et blah blah blah</p>
			{/* Render the movies or any other content based on the watchlist data */}
			<ul>
				{movies.length > 0 ? (
					movies.map((item) => (
						<Card
							key={item.imdbID}
							bookmarked={true}
							watchlistName={name}
							{...item}
						/>
					))
				) : (
					<p>Watchlist is empty</p>
				)}
			</ul>
		</main>
	);
}

export default WatchList;
