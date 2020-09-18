import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth.js";
import Home from "routes/Home.js";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

//passing userObj properties from App.js where handling authstatus to Home page so that user can use userObj.id and userObj.uid
const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj}  />
            </Route>
            <Route exact path="/profile">
              <Profile />
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
