import AppRouter from "components/Router";
import React, { useState } from "react";
import { authService } from "fbase";

function App() {
  console.log(authService.currentUser)
  const [isLoogedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoogedIn={isLoogedIn} />
      <footer>footer</footer>
    </>
  );
}

export default App;
