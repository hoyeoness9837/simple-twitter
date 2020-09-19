import React, { useEffect, useState } from "react";
import NweetFactory from "components/NweetFactory";
import Nweet from "components/Nweet";
import { dbService } from "fbase";
import Logout from "components/Logout";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    //onSnapshot is a listener, available to realtime.
    dbService.collection("nweets").onSnapshot((snapshot) =>  {
      const nweetArray = snapshot.docs.map(doc =>({id:doc.id, ...doc.data(),}))
      setNweets(nweetArray)
    });
  }, []);

  return (
    <div className="container">
      <Logout />
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
