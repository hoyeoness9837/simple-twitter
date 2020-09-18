import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("")
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try  {
    let data;
    if  (newAccount) {
      data = await authService.createUserWithEmailAndPassword(email,password);
    } else {
      data = await authService.signInWithEmailAndPassword(email,password);
    } 
    console.log(data)
  } catch (error){
      setError(error.message);
    }
  };
  
  const toggleAccount = () => setNewAccount((prev)=>!prev)
  
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
    const data = await authService.signInWithPopup(provider)
    console.log(data)
  };
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          value={email}
          onChange={onChange}
          type="text"
          placeholder="Email"
          required
        />
        <input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
          placeholder="Password"
          required
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">


          {" "}
                   {" "}
                   {" "}
          Continue with Google Account
        
        
        </button>
        <button onClick={onSocialClick} name="github">
          {" "}
         
          {" "}
         
          {" "}
          Continue with GitHub Account
        
        
        </button>
      </div>
    </div>
  );
};

export default Auth;
