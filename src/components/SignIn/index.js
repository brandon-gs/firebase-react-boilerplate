import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const SignInForm = withRouter(({ history }) => {
  const [user, setUser] = useState(INITIAL_STATE);
  const firebase = useContext(FirebaseContext);

  const handleSubmit = async e => {
    e.preventDefault();
    const { email, password } = user;

    try {
      await firebase.doSignInWithEmailAndPassword(email, password);
      setUser(INITIAL_STATE);
      history.push(ROUTES.HOME);
    } catch (e) {
      setUser({ ...user, error: e });
    }
  };

  const isInvalid = user.password === "" || user.email === "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={user.email}
        onChange={({ target: { value } }) => setUser({ ...user, email: value })}
        type="email"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={user.password}
        onChange={({ target: { value } }) =>
          setUser({ ...user, password: value })
        }
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {user.error && <p>{user.error.message}</p>}
    </form>
  );
});

export default SignInPage;

export { SignInForm };
