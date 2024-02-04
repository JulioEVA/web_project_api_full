import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";

function Login({ onSubmit, updateEmail, toggleLoggedIn, ...props }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    await onSubmit(email, password).then((res) => {
      if (!res) {
        return;
      }
      if (res.token) {
        updateEmail(email);
        toggleLoggedIn(true);
        navigate("/");
      }
    });
  }

  return (
    <>
      <Header />
      <Form
        formType="Login"
        onSubmit={handleLogin}
        className="sign-form"
        onPasswordChange={setPassword}
        onEmailChange={setEmail}
      />
      <p className="legend text">
        Not a member yet?&nbsp;
        <a className=" link text" href="/register">
          Register here
        </a>
      </p>
    </>
  );
}

export default Login;
