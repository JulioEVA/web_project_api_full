import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";
import InfoToolTip from "./InfoToolTip";

function Register({ onSubmit, onClose, toggleInfoToolTip, ...props }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  /**
   * Handles the submit event of the form.
   * @param {Object} e The event object
   */
  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(email, password).then((res) => {
      if (!res) {
        return;
      }
      if (!res.error) {
        toggleInfoToolTip(true);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        toggleInfoToolTip(false);
      }
    });
  }

  return (
    <>
      <Header isRegister={true} />
      <Form
        formType="Register"
        onSubmit={handleSubmit}
        className="sign-form"
        onPasswordChange={setPassword}
        onEmailChange={setEmail}
      />
      <p className="legend text">
        Already a member?&nbsp;
        <a className=" link text" href="/login">
          Login here
        </a>
      </p>
      <InfoToolTip
        isOpen={props.isOpen}
        isSuccessful={props.isSuccessful}
        onClose={onClose}
      />
    </>
  );
}

export default Register;
