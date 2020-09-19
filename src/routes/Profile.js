import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({refreshUser, userObj}) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/"); //after signout, redirect to root url(home)
  };
  
  // const getMyNweets = async() =>{
  //   //get this one more powerful using different args for where()
  //   const nweets = await dbService.collection("nweets").where("creatorId","==",userObj.uid).orderBy("createdAt").get() 
  //   //error will tell you do create indexes for thie query.
  //   console.log(nweets.docs.map((doc)=>doc.data()))
  // }

  const onSubmit = async (e) => {
    e.preventDefault();
    if(userObj.displayName !== newDisplayName){
      await userObj.updateProfile({
        displayName:newDisplayName,
      })
      refreshUser();
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
    <>
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value = {newDisplayName} type="text" placeholder="Display Name"/>
      <input type="submit" value="Update Profile"/>
    </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
