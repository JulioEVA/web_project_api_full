export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = { headers: options.headers };
    this._headersContentType = {
      authorization: this._headers.headers.authorization,
      "Content-Type": "application/json",
    };
    this._userUrl = this._baseUrl + "/users/me";
    this._cardsUrl = this._baseUrl + "/cards";
  }

  /**
   * Makes an API call with the provided options
   *
   * @param {string} url - the URL to make the API call to
   * @param {object} options - the options for the API call
   * @returns {Promise} the response from the API
   */
  async _callApi(url, options) {
    return await fetch(url, options)
      .then((res) => {
        this._checkRequestStatus(res);
        return res.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Checks if the response from the server was a valid one.
   * If not, throws an error.
   * @param {*} res
   */
  _checkRequestStatus(res) {
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
  }

  /**
   * Gets the server-saved cards.
   *
   * @returns A JSON promise with the previously saved cards.
   */
  getInitialCards() {
    return this._callApi(this._cardsUrl, this._headers);
  }

  /**
   * Gets the server-saved user info.
   * @returns A JSON promise with the previously saved user info
   */
  getUserInfo() {
    return this._callApi(this._userUrl, this._headers);
  }

  /**
   * Sets the user info given an object with the update user info.
   *
   * @param {*} object An object containing the updated user info
   * @returns A promise with the server's response
   */
  setUserInfo({ name, about }) {
    return this._callApi(this._userUrl, {
      method: "PATCH",
      headers: this._headersContentType,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  /**
   * Updates the user's avatar given the link to a new avatar image.
   *
   * @param {*} link
   * @returns
   */
  updateUserAvatar(link) {
    return this._callApi(this._userUrl + "/avatar", {
      method: "PATCH",
      headers: this._headersContentType,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }

  /**
   * Creates a card given the name and link for it.
   *
   * @param {*} object An object containing the name and link of the card.
   * @returns An JSON promise with the new card data.
   */
  createCard({ name, link }) {
    return this._callApi(this._cardsUrl, {
      method: "POST",
      headers: this._headersContentType,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  /**
   * Deletes a card given the ID of it.
   *
   * @param {*} cardId The card's ID to be deleted
   * @returns Returns a JSON promise with a confirmation if succesful.
   */
  deleteCard(cardId) {
    return this._callApi(this._cardsUrl + `/${cardId}`, {
      method: "DELETE",
      headers: this._headersContentType,
    });
  }

  /**
   * Adds a new like to a card given its cardID
   * @param {*} cardId The card's ID
   * @returns A card with the updated like info
   */
  likeCard(cardId) {
    return this._callApi(this._cardsUrl + `/${cardId}/likes`, {
      method: "PUT",
      headers: this._headersContentType,
    });
  }

  /**
   * Removes a like from a card given its cardID
   * @param {*} cardId The card's ID
   * @returns A card with the updated like info
   */
  dislikeCard(cardId) {
    return this._callApi(this._cardsUrl + `/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headersContentType,
    });
  }

  /**
   * Sets the authorization header with the given token.
   * @param {*} token The token to be used for authorization
   */
  setAuthorization(token) {
    this._headersContentType.authorization = token;
  }
}
