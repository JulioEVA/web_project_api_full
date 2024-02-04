function ImagePopup(props) {
  return (
    <div
      className={`dialog-container ${
        props.isOpen ? "dialog-container_is-visible " : ""
      }`}
    >
      <dialog
        className={`image-popup popup ${
          props.isOpen ? "popup_is-visible " : ""
        }`}
        open={props.isOpen}
      >
        <button onClick={props.onClose} className="close-button button">
          <img
            src={require("../images/close-button.png")}
            alt="X icon to close the popup"
          />
        </button>
        <h2 className="image-popup__title text">
          {props.card && props.card.name}
        </h2>
        <img
          src={props.card && props.card.link}
          className="image-popup__image"
          alt="Provided by the user"
        />
      </dialog>
    </div>
  );
}

export default ImagePopup;
