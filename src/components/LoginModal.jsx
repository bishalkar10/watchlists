import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  logout,
  hideLoginModal,
} from "../features/loginModal/loginModalSlice"; // Adjust the import path as necessary

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

  function handleLogin(e) {
    e.preventDefault();
    const trimmedFormData = {};

    // remove the trailing spaces of the vlaues
    Object.entries(formData).forEach(([key, value]) => {
      trimmedFormData[key] = value.trim();
    });

    // Update formData with trimmed values
    if (Object.values(trimmedFormData).every((value) => value)) {
      setFormData(trimmedFormData);
      dispatch(login(trimmedFormData));
      dispatch(hideLoginModal());
      dispatch(addUser(trimmedFormData));
    } else {
      console.log("Any fields cannot be empty");
    }
  }

  return (
    <dialog ref={dialogRef}>
      <form>
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
            placeholder="name@email.com"
            pattern="[a-z0-9\.]+@[a-z0-9\.]+\.[a-z]{2,}"
            required
          />
        </label>
        <div className="button-container">
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleLogin}>
            Log in
          </button>
        </div>
      </form>
    </dialog>
  );
}
