import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { FirebaseContext } from "../Firebase";
import { AuthUserContext } from "./";
import * as ROUTES from "../../constants/routes";

const withAuthorization = condition => Component => props => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const history = useHistory();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    const getAuthState = async () => {
      await firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) history.push(ROUTES.SIGN_IN);
      });
      setLoad(true);
    };

    getAuthState();
  }, [firebase, history]);

  return condition(authUser) && load && <Component {...props} />;
};

export default withAuthorization;
