import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faHouseChimney,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";

import {
  showLoginModal,
  logout,
} from "../features/loginModal/loginModalSlice.js";

export default function Sidebar() {
  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginModal.user);
  const isOpen = useSelector((state) => state.loginModal.isOpen);

  const watchlists = useSelector(
    (state) => (user.email && state.watchlist[user.email]?.watchlists) || [],
  );
  // used to filter or search watchlist on the sidebar
  const filteredItems = watchlists.filter((item) =>
    item?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  function handleLogout() {
    // if we are in watchlist page and then log out and refresh the page we will get error cause then user.email will ""
    navigate("/");
    dispatch(logout());
  }

  return (
    <div className="sidebar">
      <h1>Watchlists</h1>
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FontAwesomeIcon
          className="inner-search-icon"
          icon={faMagnifyingGlass}
        />
      </form>

      <div className="home">
        <Link to="/">
          <FontAwesomeIcon className="home-icon" icon={faHouseChimney} /> Home
        </Link>
      </div>
      <div id="list-container">
        <h2>My Lists</h2>
        <ul>
          {filteredItems.map((item, index) => {
            return (
              <li key={index}>
                <Link to={`/watchlist/${item.name}`} state={{ ...item }}>
                  <span className="list-icon">
                    {item.name.charAt(0).toUpperCase()}
                  </span>
                  &nbsp;
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="user">
        {showOptions && (
          <button className="login-btn">
            {user.name ? (
              <div onClick={handleLogout}>Log out</div>
            ) : (
              <div onClick={() => dispatch(showLoginModal())}>Log in</div>
            )}
          </button>
        )}
        <div className="container">
          {user.name ? (
            <img className="profile-picture" src="/profile_picture.png" />
          ) : (
            <FontAwesomeIcon className="user-icon" icon={faCircleUser} />
          )}
          {user.name ? user.name : "Guest"}
          <FontAwesomeIcon
            className="ellipsis-icon"
            icon={faEllipsis}
            onClick={() => setShowOptions((prevState) => !prevState)}
          />
        </div>
      </div>
    </div>
  );
}
