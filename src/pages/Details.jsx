import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
	const { imdbID } = useParams();
	const [loading, setLoading] = useState(false);
	const [movieDetails, setMovieDetails] = useState({});

	useEffect(() => {
		const apiKey = import.meta.env.VITE_API_KEY;
		const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

		setLoading(true); // Set loading to true before fetching data

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setMovieDetails(data);
			})
			.catch((error) => console.log(error.message))
			.finally(() => {
				setLoading(false); // Set loading back to false after fetching data
			});
	}, [imdbID]); // Dependency array to run effect when imdbID changes

	return (
		<main id="details-page">
			{loading ? (
				<p>Loading...</p>
			) : (
				<div>
					<img
						src={movieDetails.Poster}
						alt={` Picture of ${movieDetails.Title}`}
					/>
					<h2 className="title">{movieDetails.Title}</h2>
					<p className="release">
						Released : <span>{movieDetails.Released}</span>
					</p>
					<p className="plot">
						Plot :<span>{movieDetails.Plot}</span>
					</p>
					{/* Display movie details here */}
				</div>
			)}
		</main>
	);
}
