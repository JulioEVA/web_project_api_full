function Form({
  formType,
  onSubmit,
  onPasswordChange,
  onEmailChange,
  className,
  ...props
}) {
  return (
    <div className="container">
      <h1 className="register-title text">{formType}</h1>
      <form
        className={`form ${className ? className : ""}`}
        onSubmit={onSubmit}
      >
        <input
          className="form__input input"
          required
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <input
          className="form__input input"
          required
          minLength="2"
          name="password"
          autoComplete="current-password"
          type="password"
          placeholder="Password"
          onChange={(e) => onPasswordChange(e.target.value)}
        />
        <button className="form__button button" type="submit">
          {formType}
        </button>
      </form>
    </div>
  );
}

export default Form;
