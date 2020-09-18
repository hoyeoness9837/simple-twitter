import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); // default mode is false.
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Do you want to delete this message?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev); // toggling editing mode.
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false); // ending editing state.
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  return (
    <div>
      {editing ? ( //if user clicks edit button and toggle to editing state true, following will show up.
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your message"
              value={newNweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update"></input>
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && ( //only if user is the owner, they will see the buttons
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
