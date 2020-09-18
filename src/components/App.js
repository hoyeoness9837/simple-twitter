import AppRouter from "components/Router";
import React, { useEffect, useState } from "react";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoogedIn, setIsLoggedIn] = useState(authService.currentUser);
  
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoogedIn={isLoogedIn} /> : "Fire Base is Initializing..."}
      <footer>footer</footer>
    </>
  );
}

export default App;
