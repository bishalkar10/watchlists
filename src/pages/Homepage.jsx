import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

import Card from "../components/Card.jsx";

export default function Homepage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieCards, setMovieCards] = useState([]);
  // Function to handle input change
  function handleInputChange(e) {
    setQuery(e.target.value);
  }

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    fetchData(query);
  }

  async function fetchData(query) {
    if (!query.trim()) {
      return;
    }

    setLoading(true); // Set loading to true before making the API call
    setMovieCards([]); // Clear the previous movieCards array

    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query.trim()}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        // to get the rating of the individual movies we need to make an api call using individual imdbID
        // we can get the imdb id from data.Search.map(movie=> movie.imdbID) and then make a Promise.all([]) call to get the ratings
        // making those multiple api call will reduce performance and use more network bandwith. But I can implement
        setMovieCards([...data.Search]);
      } else {
        console.log("Nothing is here");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading back to false after API call finishes
    }
  }

  return (
    <main id="homepage">
      <div id="welcome-container">
        <p id="welcome-text">
          Welcome to <span>Watchlists</span>
        </p>
        <p>
          Browse movie, add them to watchlists and share them with friends.
          <br />
          Just click the to add a movie, the poster to see more details or to
          mark the movie as watched.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="search Movies"
          placeholder="Search Movie titles"
          value={query}
          onChange={handleInputChange}
          placeholder="Search Movie titles"
        />
        <FontAwesomeIcon
          className="inner-search-icon"
          icon={faMagnifyingGlass}
        />
        <button aria-label="Search button">Search</button>
      </form>

      {loading ? (
        <>Loading ...</>
      ) : (
        <ul>
          {movieCards.map((item) => (
            <Card key={item.imdbID} {...item} />
          ))}
        </ul>
      )}
    </main>
  );
}
