import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import Api from "../utils/api";
import auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [authToken, setAuthToken] = React.useState(localStorage.getItem("jwt"));
  const navigate = useNavigate();

  const api = new Api({
    baseUrl: "https://api.around.traveling.com.ar",
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  });

  /**
   * Stores the given card in the state variable.
   * @param {*} card The card that is to be stored.
   */
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  /**
   * Changes the state variable status in order to open the given popup
   */
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  /**
   * Changes the state variable status in order to open the given popup
   */
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  /**
   * Changes the state variable status in order to open the given popup
   */
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  /**
   * Closes all the popups by restoring the states variables to its default values.
   */
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard("");
  }

  /**
   * Sets the user info through the API given the parameter user
   * @param {Object} user The user with the updated info
   */
  function handleUpdateUser(user) {
    api.setUserInfo(user).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    });
  }

  /**
   * Changes the avatar photo by the given link
   * @param {Object} avatar An object containing the link to the new picture
   */
  function handleUpdateAvatar({ avatar }) {
    api.updateUserAvatar(avatar).then((updatedUser) => {
      setCurrentUser(updatedUser);
      closeAllPopups();
    });
  }

  /**
   * Handles the like interaction when a user likes a card
   * @param {Object} card The card that was liked
   * @param {boolean} isLiked Value that determines whether or not the card was previously liked
   */
  function handleCardLike(card, isLiked) {
    //Envía una petición a la API y obteón los datos actualizados de la tarjeta
    if (!isLiked) {
      api.likeCard(card._id).then((newCard) => {
        _refreshCards(card, newCard);
      });
    } else {
      api.dislikeCard(card._id).then((newCard) => {
        _refreshCards(card, newCard);
      });
    }
  }

  /**
   * Refreshes the array of cards by replacing the card with the newCard
   * @param {Object} card The card that was liked
   * @param {Object} newCard The card with the like info updated
   */
  function _refreshCards(card, newCard) {
    setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
  }

  /**
   * Handles the request to delete a card
   * @param {Object} card The card to delete
   * @param {boolean} isOwn Whether or not the card belongs to the current user
   */
  function handleCardDelete(card, isOwn) {
    if (isOwn) {
      api.deleteCard(card._id).then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      });
    }
  }

  /**
   * Handles the creation of a new card
   * @param {Object} card
   */
  function handleAddPlaceSubmit(card) {
    api.createCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  /**
   * Stores the user in the state variables
   * and sets the authToken in the local storage.
   *
   * @param {*} user The user to store
   */
  function storeUser(user) {
    setCurrentUser(user);
    setLoggedIn(true);
    setEmail(user.email);
    navigate("/");
  }

  /**
   * Handles the login of a user
   * @param {String} email
   * @param {String} password
   */

  async function handleLogin(email, password) {
    return await auth.authorize(email, password).then(async (res) => {
      if (!res) {
        return;
      }
      if (res.token) {
        setAuthToken(res.token);
        api.setAuthorization(res.token);
        await auth.checkToken(res.token).then((user) => {
          storeUser(user.data);
          localStorage.setItem("jwt", res.token);
        });
      }
    });
  }

  /**
   * Handles the signup of a user
   * @param {String} email
   * @param {String} password
   */
  function handleSignup(email, password) {
    return auth.register(email, password).catch((err) => console.log(err));
  }

  /**
   * Toggle the info tooltip popup
   * @param {Boolean} isSuccessful
   */
  function toggleInfoToolTip(isSuccessful) {
    setIsSuccessful(isSuccessful);
    setIsInfoTooltipOpen(true);
  }

  /**
   * Handles the sign out of a user
   */
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/login");
  }

  /**
   * Gets the saved cards and stores them in the state variable.
   */
  React.useEffect(() => {
    if (!authToken) return;
    api.getInitialCards().then((cards) => {
      setCards(cards);
    });
  }, [authToken]);

  /**
   * Checks if the user is logged in by checking the authToken state variable.
   */
  React.useEffect(() => {
    if (authToken) {
      auth
        .checkToken(authToken)
        .then((res) => {
          if (res) {
            storeUser(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [authToken]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <CurrentUserContext.Provider value={currentUser}>
              <Header
                loggedIn={loggedIn}
                email={email}
                onSignOut={handleSignOut}
              />
              <Main
                onCardClick={handleCardClick}
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                cards={cards}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
              />
              <Footer />
              <EditProfilePopup
                onUpdateUser={handleUpdateUser}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlaceSubmit={handleAddPlaceSubmit}
              />
              <EditAvatarPopup
                onUpdateAvatar={handleUpdateAvatar}
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
              />
              <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                isOpen={isImagePopupOpen}
              />
              <dialog className="popup confirmation-popup">
                <button className="close-button button">
                  <img
                    src={require("../images/close-button.png")}
                    alt="Icono de una X"
                  />
                </button>
                <h2 className="confirmation-popup__title text">
                  ¿Are you sure?
                </h2>
                <button className="save-button button" type="submit">
                  Yes
                </button>
              </dialog>
            </CurrentUserContext.Provider>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/register"
        element={
          <Register
            onSubmit={handleSignup}
            toggleInfoToolTip={toggleInfoToolTip}
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            isSuccessful={isSuccessful}
          />
        }
      />
      <Route
        path="/login"
        element={
          <Login
            onSubmit={handleLogin}
            updateEmail={setEmail}
            toggleLoggedIn={setLoggedIn}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
