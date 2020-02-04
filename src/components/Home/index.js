import React from "react";

import { withAuthorization } from "../Session";

const Home = () => (
  <div>
    <h1>Home</h1>
    <p>The home page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
