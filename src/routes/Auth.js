import { authService } from "fbase";
import { auth } from "firebase";
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
        <input type="submit" value={newAccount ? "Create Account" : "Sign In"}/>
      {error}
      </form>
  <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
      <div>
        <button> Continue with Google Account</button>
        <button> Continue with GitHub Account</button>
      </div>
    </div>
  );
};

export default Auth;
