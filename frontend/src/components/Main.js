import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ cards, onCardLike, onCardDelete, onCardClick, ...props }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="avatar-container">
          <img className="avatar" src={currentUser.avatar} alt="User avatar" />
          <button
            onClick={props.onEditAvatarClick}
            className="avatar-button button"
          >
            <img
              className="avatar-edit-icon"
              src={require("../images/avatar-edit.png")}
              alt="Avatar edit icon"
            />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title text">{currentUser.name}</h1>
          <button
            onClick={props.onEditProfileClick}
            className="edit-button button"
          >
            <img
              src={require("../images/edit-button.png")}
              alt="User info edit icon"
            />
          </button>
          <h2 className="profile__subtitle text">{currentUser.about}</h2>
        </div>
        <button
          onClick={props.onAddPlaceClick}
          className="add-button button"
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            onCardClick={onCardClick}
            card={card}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
