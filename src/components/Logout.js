import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/"); //after signout, redirect to root url(home)
  };
  return (
    <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
      Log out
    </span>
  );
};

export default Logout;
