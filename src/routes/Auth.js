import { authService, firebaseInstance } from "fbase";
import React from "react";
import AuthForm from 'components/AuthForm'

const Auth = () => {
  const onSocialClick = async(e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider()
    }
    await authService.signInWithPopup(provider)
  };
  
  return (
      <>
        <AuthForm/>
        <button onClick={onSocialClick} name="google">
          Sign In with Google Account
        </button>
        <button onClick={onSocialClick} name="github">
          Sign in with GitHub newAccount
        </button>
      </>
  );
};

export default Auth;
