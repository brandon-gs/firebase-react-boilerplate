import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";

import * as ROUTES from "../../constants/routes";

import { AuthUserContext } from "../Session";

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [load, setLoad] = useState(false);

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const getAuthState = async () => {
      await firebase.auth.onAuthStateChanged(authUser => {
        authUser ? setAuthUser(authUser) : setAuthUser(null);
      });
      setLoad(true);
    };

    getAuthState();
  });

  return (
    load && (
      <AuthUserContext.Provider value={authUser}>
        <Router>
          <div>
            <Navigation out={load && authUser} load={load} />

            <Route exact path={ROUTES.LANDING} component={LandingPage} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route
              path={ROUTES.PASSWORD_FORGET}
              component={PasswordForgetPage}
            />
            <Route path={ROUTES.HOME} component={HomePage} />
            <Route path={ROUTES.ACCOUNT} component={AccountPage} />
            <Route path={ROUTES.ADMIN} component={AdminPage} />
          </div>
        </Router>
      </AuthUserContext.Provider>
    )
  );
};

export default App;
