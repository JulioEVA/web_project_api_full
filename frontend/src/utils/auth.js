class Auth {
  constructor() {
    this.BASE_URL = "https://api.around.traveling.com.ar";
    this._headers = {
      "Content-Type": "application/json",
    };
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
   * Registers a user through the API
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise} the response from the API
   */
  register = (email, password) => {
    return this._callApi(`${this.BASE_URL}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  };

  /**
   * Authorizes a user through the API
   *
   * @param {string} email - the email of the user
   * @param {string} password - the password of the user
   * @returns {Promise} the response from the API
   */
  authorize = (email, password) => {
    return this._callApi(`${this.BASE_URL}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    })
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  };

  /**
   * Checks the token of the user
   * @param {string} token - the token of the user
   * @returns {Promise} the response from the API
   */
  checkToken = (token) => {
    return this._callApi(`${this.BASE_URL}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  };
}

const auth = new Auth();
export default auth;
