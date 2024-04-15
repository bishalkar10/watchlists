import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  logout,
  hideLoginModal,
} from "../features/loginModal/loginModalSlice"; // Adjust the import path as necessary
import { showBookmarkWatchlistModal } from "../features/watchlist/watchlistModalSlice";
import { addUser } from "../features/watchlist/watchlistSlice";

export default function LoginModal() {
  const dialogRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginModal.user);
  const isOpen = useSelector((state) => state.loginModal.isOpen);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  }

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  function closeModal(e) {
    e.preventDefault();
    dispatch(hideLoginModal());
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Access form data directly from the form element
    const formData = new FormData(e.target);

    // Get the values of the form fields
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();

    // Define regular expression pattern for email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate input fields
    if (name && email && emailPattern.test(email)) {
      // Dispatch actions with form data
      dispatch(login({ name, email }));
      dispatch(hideLoginModal());
      dispatch(addUser({ name, email }));
    } else {
      console.log("Please fill in all fields correctly.");
    }
  }

  return (
    <dialog ref={dialogRef}>
      <form onSubmit={handleSubmit}>
        <label>
          Name :
          <input
            name="name"
            id="username"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="enter name"
            required
          />
        </label>
        <label>
          Email :
          <input
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="enter your email"
            required
          />
        </label>
        <div className="button-container">
          <button className="cancel-btn" type="button" onClick={closeModal}>
            Cancel
          </button>
          <button className="save-btn">Log in</button>
        </div>
      </form>
    </dialog>
  );
}
