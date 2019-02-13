import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Connection from "./Connection";
import ConnectionListing from "./ConnectionListing";

const Routes = () => (
  <Router basename="/connection">
    <Switch>
      <Route path="/:connectionId" component={Connection} />
      <Route component={ConnectionListing} />
    </Switch>
  </Router>
);

export default Routes;
