import React, { useState } from "react";


const Modal = (props) => {
  const [showing, setShowing] = useState(true);

  const toggleShowing = () => {
    setShowing((prev) => !prev); // toggling editing mode.
  };

  return (
    <div
      style={{
        width:  showing ? "50%":"100%",
        height:  showing ? "50%": "100%",
      }}
      onClick={toggleShowing}
      className="nweet__img__modal"
    >
      {props.children}
    </div>
  );
};

export default Modal;
