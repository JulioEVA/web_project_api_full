import React, { useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function PopupWithForm({
  isOpen,
  className,
  onClose,
  title,
  inputId,
  inputMaxLength,
  inputType,
  placeholder,
  children,
  saveButtonText,
  onSubmit,
}) {
  // Subscription to the context
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");

  const inputRef = useRef(null);
  /**
   * Updates the value of the state variable name whenever the input changes.
   * @param {*} e
   */
  function handleChange(e) {
    setName(e.target.value);
  }

  /**
   * Submbits the data to the server through the onSubmit method
   * @param {*} e The submbit event
   */
  function handleSubmit(e) {
    if (inputId.includes("avatar-link" || "place-input")) {
      onSubmit(e, inputRef);
      return;
    }
    onSubmit(e, name);
  }

  /**
   * After the component mounts, the name of the current user is
   * set to the state variable name
   */
  React.useEffect(() => {
    setName(currentUser.name);
  }, [currentUser]);

  return (
    <div
      className={`dialog-container ${
        isOpen ? "dialog-container_is-visible " : ""
      }`}
    >
      <dialog className={`${className} popup`} open={isOpen}>
        <form className="form form-popup__container" noValidate>
          <button
            onClick={onClose}
            type="button"
            className="close-button button"
          >
            <img src={require("../images/close-button.png")} alt="Close icon" />
          </button>
          <h2 className="form-popup__title text">{title}</h2>
          <input
            ref={inputRef}
            onChange={handleChange}
            id={inputId}
            maxLength={inputMaxLength}
            minLength="2"
            required
            className="input"
            type={inputType}
            placeholder={placeholder}
            defaultValue={inputId.includes("name-input") ? name : ""}
          />
          <span className={`form__input-error ${inputId}-error text`}></span>
          {children}
          <button
            className="save-button button"
            onClick={handleSubmit}
            type="submit"
          >
            {saveButtonText}
          </button>
        </form>
      </dialog>
    </div>
  );
}

export default PopupWithForm;
