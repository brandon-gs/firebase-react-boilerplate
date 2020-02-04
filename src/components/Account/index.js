import React, { useContext } from "react";
import { AuthUserContext } from "../Session/";
// import { PasswordForgetForm } from '../PasswordForget';
// import PasswordChangeForm from '../PasswordChange';
import { withAuthorization } from "../Session";

const AccountPage = () => {
  const authUser = useContext(AuthUserContext);

  return (
    <div>
      <h1>Account: {authUser.email} </h1>
      {/* 
              <PasswordForgetForm />
              <PasswordChangeForm />
           */}
    </div>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
