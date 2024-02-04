import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [description, setDescription] = React.useState(currentUser.about);
  /**
   * Updates the value of the state variable description whenever the about-input changes.
   * @param {*} e The change event
   */
  function handleChange(e) {
    setDescription(e.target.value);
  }

  // After loading the current user from the API
  // their data will be used in managed components.
  React.useEffect(() => {
    setDescription(currentUser.about);
  }, [currentUser]);

  /**
   * Handles the submitting of the Edit Profile popup form
   * @param {*} e The submit event
   * @param {*} name The name of the user
   */
  function handleSubmit(e, name) {
    e.preventDefault();

    if (!name || !description) return;

    // Passes the values of the managed components to the external controller.
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      className="edit-popup form-popup"
      title="Edit profile"
      inputId="name-input"
      placeholder="Name"
      saveButtonText="Save"
      inputMaxLength="30"
      inputType="text"
      isOpen={isOpen}
      onClose={onClose}
    >
      <input
        onChange={handleChange}
        id="about-input"
        minLength="2"
        maxLength="200"
        required
        className="input"
        type="text"
        placeholder="About me"
        defaultValue={description}
      />
      <span className={`form__input-error about-input-error text`}></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
