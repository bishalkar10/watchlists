import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // Changed faX to faTimes
import { useState } from "react";
import Sidebar from "../components/Sidebar.jsx";

export default function Navbar() {
	const [openSidebar, setOpenSidebar] = useState(false); // Destructuring useState hook

	return (
		<header>
			<h1>Watchlists</h1>
			<button
				id="toggle-btn"
				onClick={() => setOpenSidebar(!openSidebar)}
			>
				<FontAwesomeIcon icon={openSidebar ? faTimes : faBars} />{" "}
			</button>
			{openSidebar && <Sidebar />}
		</header>
	);
}
