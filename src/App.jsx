import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import WatchList from "./pages/WatchList.jsx";
import Details from "./pages/Details.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx"; // Import the Sidebar component
import LoginModal from "./components/LoginModal.jsx";
import WatchlistModal from "./components/WatchlistModal.jsx";

function App() {
  return (
    <Router>
      <Sidebar />
      <Navbar />
      <LoginModal />
      <WatchlistModal />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/watchlist/:name" element={<WatchList />} />
        <Route path="/details/:imdbID" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
