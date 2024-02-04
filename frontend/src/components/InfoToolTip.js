import React from "react";

function InfoToolTip({ isOpen, onClose, isSuccessful }) {
  return (
    <div
      className={`dialog-container ${
        isOpen ? "dialog-container_is-visible " : ""
      }`}
    >
      <dialog className={`form-popup popup`} open={isOpen}>
        <form className="form form-popup__container">
          <button
            onClick={onClose}
            type="button"
            className="close-button button"
          >
            <img src={require("../images/close-button.png")} alt="Close icon" />
          </button>
          <img
            className="popup__image"
            src={
              isSuccessful
                ? require("../images/success.png")
                : require("../images/failure.png")
            }
            alt="Success icon"
          />
          <h2 className="popup__title">
            {isSuccessful
              ? "Success! You're now a member. You'll be redirected to the login page in 5 seconds."
              : "Oops, something went wrong. Please try again later"}
          </h2>
        </form>
      </dialog>
    </div>
  );
}

export default InfoToolTip;
