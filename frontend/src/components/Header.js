function Header({ loggedIn, email, onSignOut, isRegister }) {
  return (
    <>
      <header className="header">
        <img
          src={require("../images/logo.png")}
          alt="Page's logo"
          className="logo"
        />
        <a
          className={loggedIn ? "link_inactive" : "link text"}
          href={isRegister ? "/login" : "/register"}
        >
          {isRegister ? "Login" : "Register"}
        </a>
        <button
          className={
            loggedIn ? "header__button text button " : "button_inactive"
          }
          onClick={onSignOut}
        >
          {loggedIn && (
            <>
              <p>{email}</p>
              <p>Sign out</p>
            </>
          )}
        </button>
      </header>
      <hr className="header__separator" />
    </>
  );
}

export default Header;
