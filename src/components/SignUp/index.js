import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
  <main>
    <h1>SignUp</h1>
    <SignUpForm />
  </main>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const SignUpForm = withRouter(({ history }) => {
  const [user, setUser] = useState(INITIAL_STATE);
  const firebase = useContext(FirebaseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, passwordOne } = user;
    try {
      const authUser = await firebase.doCreateUserWithEmailAndPassword(
        email,
        passwordOne
      );
      setUser({ ...INITIAL_STATE });
      history.push(ROUTES.HOME);
    } catch (e) {
      setUser({ ...user, error: e.message});
    }
  };

  const isInvalid =
    user.passwordOne !== user.passwordTwo ||
    user.passwordOne.trim() === "" ||
    user.email.trim() === "" ||
    user.username.trim() === "";

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={user.username}
        onChange={({ target: { value } }) =>
          setUser({ ...user, username: value })
        }
        type="text"
        placeholder="Username"
      />
      <input
        name="email"
        value={user.email}
        onChange={({ target: { value } }) => setUser({ ...user, email: value })}
        type="email"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={user.passwordOne}
        onChange={({ target: { value } }) =>
          setUser({ ...user, passwordOne: value })
        }
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={user.passwordTwo}
        onChange={({ target: { value } }) =>
          setUser({ ...user, passwordTwo: value })
        }
        type="password"
        placeholder="Confirm password"
      />
      <button type="submit" disabled={isInvalid}>
        Sign Up
      </button>
      {user.error && <p>{user.error.message}</p>}
    </form>
  );
});

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
