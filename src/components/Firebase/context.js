import React from "react";

const FirebaseContext = React.createContext(null);

/* 

*** HIGH ORDER COMPONENS ***
We don't need this beacuse we use react hooks and we have useContext

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);
 */
export default FirebaseContext;
