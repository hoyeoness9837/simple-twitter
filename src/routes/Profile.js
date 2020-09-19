import Logout from "components/Logout";
// import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Profile = ({refreshUser, userObj}) => {

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  
  // const getMyNweets = async() =>{
  //   //get this one more powerful using different args for where()
  //   const nweets = await dbService.collection("nweets").where("creatorId","==",userObj.uid).orderBy("createdAt").get() 
  //   //error will tell you do create indexes for thie query.
  //   console.log(nweets.docs.map((doc)=>doc.data()))
  // }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newDisplayName.length > 1 && userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    } else if(newDisplayName.length < 1) {
      alert("New display name is too short.")
    } else if(userObj.displayName === newDisplayName) {
      alert("You can't change to the same display name.")
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  useEffect(() => {
    // getMyNweets()
  }, [])

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          className="formInput"
          autoFocus
          onChange={onChange}
          value={newDisplayName}
          type="text"
          placeholder="Display Name"
          required
          minLength="1"
          maxLength="15"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <Logout />
    </div>
  );
};

export default Profile;
