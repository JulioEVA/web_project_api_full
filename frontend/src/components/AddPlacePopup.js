import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const inputRef = useRef(null);

  /**
   * Handles the submitting of a new card
   * @param {*} e the submit event
   */
  function handleSubmit(e, title) {
    e.preventDefault();
    onAddPlaceSubmit({ name: title, link: inputRef.current.value });
  }

  return (
    <PopupWithForm
      className="add-popup form-popup popup"
      title="New place"
      inputId="place-input"
      placeholder="Title"
      saveButtonText="Create"
      inputMaxLength="30"
      inputType="text"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        id="link-input"
        minLength="2"
        required
        className="input"
        type="url"
        placeholder="Link to the image"
      />
      <span className={`form__input-error link-input-error text`}></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
