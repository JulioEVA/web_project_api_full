import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import deleteButtonIcon from "../images/delete-button.png";
import likeButtonIcon from "../images/like-button.png";

function Card({ onCardClick, onCardLike, onCardDelete, card }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Checking if the current user is the owner of the current card
  const isOwn = card.owner === currentUser._id;

  // Creating a variable that will later be set in `className` for the delete button
  const cardDeleteButtonClassName = `button ${
    isOwn ? "delete-button" : "delete-button_inactive"
  }`;

  // Check if the current user has liked the card
  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Creating a variable that will later be set in `className` for the like button
  const cardLikeButtonClassName = `${isLiked ? "like_active" : "like"}`;

  /**
   * Handles the click event of the card
   */
  function handleClick() {
    onCardClick(card);
  }

  /**
   * Handles the click event of the like button
   */
  function handleLikeClick() {
    onCardLike(card, isLiked);
  }

  /**
   * Handles the click event of the delete button
   */
  function handleDeleteClick() {
    onCardDelete(card, isOwn);
  }

  return (
    <div className="element">
      <img
        onClick={handleClick}
        className="element__image"
        src={card.link}
        alt="Provided by the user"
      />
      <button onClick={handleDeleteClick} className={cardDeleteButtonClassName}>
        <img src={deleteButtonIcon} alt="Delete button icon" />
      </button>
      <h3 className="element__title text">{card.name}</h3>
      <button onClick={handleLikeClick} className="like-button button">
        <img
          className={cardLikeButtonClassName}
          src={likeButtonIcon}
          alt="Like icon"
        />
        <div className="like-counter">{card.likes.length}</div>
      </button>
    </div>
  );
}

export default Card;
