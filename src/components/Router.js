import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth.js";
import Home from "routes/Home.js";

const AppRouter = ({isLoogedIn}) => {
  
  return (
    <Router>
      <Switch>
        {isLoogedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
