import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedMovie,
  showBookmarkWatchlistModal,
} from "../features/watchlist/watchlistModalSlice";
import { showLoginModal } from "../features/loginModal/loginModalSlice";

import { removeMovie } from "../features/watchlist/watchlistSlice";

export default function Card(props) {
  const { imdbID, Title, Year, Poster, bookmarked, watchlistName } = props;
  const movie = { imdbID, Title, Year, Poster }; // store this objects needed in movie object which we will pass to Card component
  const dispatch = useDispatch();
  const email = useSelector((state) => state.loginModal.user.email);

  function handleBookmarkClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (email) {
      // if user is logged in then open the bookmark modal else open the login modal
      dispatch(showBookmarkWatchlistModal());
      dispatch(setSelectedMovie(movie)); // Dispatch action to store selected movie data
    } else {
      console.log(
        "You are not logged in. You need to log in to add to watchlist",
      );
      dispatch(showLoginModal());
    }
  }

  function handleRemove(e) {
    e.stopPropagation();
    dispatch(removeMovie({ email, watchlistName, imdbID }));
  }

  return (
    <li className="card">
      <Link to={`/details/${imdbID}`}>
        <figure>
          <div className="image-container">
            <img src={Poster} alt={`Picture of ${Title}`} />
          </div>
          <figcaption>
            <span className="title">{Title}</span>
            <span className="year">({Year})</span>
          </figcaption>
        </figure>
      </Link>
      {bookmarked ? (
        <button
          className="remove"
          aria-label={`Remove ${Title} from the watchlist`}
          onClick={handleRemove}
        >
          <FontAwesomeIcon className="remove-icon" icon={faTrashCan} />
        </button>
      ) : (
        <button
          className="bookmark"
          aria-label={`Bookmark ${Title}`}
          onClick={handleBookmarkClick}
        >
          <FontAwesomeIcon className="bookmark-icon" icon={faBookmark} />
          <FontAwesomeIcon className="plus-icon" icon={faPlus} />
        </button>
      )}
    </li>
  );
}
