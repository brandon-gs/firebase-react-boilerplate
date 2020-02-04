import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm></PasswordForgetForm>
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null
};

const PasswordForgetForm = () => {
  const [email, setEmail] = useState(INITIAL_STATE.email);
  const [error, setError] = useState(INITIAL_STATE.error);

  const firebase = useContext(FirebaseContext);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await firebase.doPasswordReset(email);
      setEmail(INITIAL_STATE.email);
      setError(INITIAL_STATE.error);
    } catch (e) {
      setError(e);
    }
  };

  const isInvalid = email === "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="email"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };