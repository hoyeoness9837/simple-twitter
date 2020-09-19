import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    //onSnapshot is a listener, available to realtime.
    dbService.collection("nweets").onSnapshot((snapshot) =>  {
      const nweetArray = snapshot.docs.map(doc =>({id:doc.id, ...doc.data(),}))
      setNweets(nweetArray)
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if(attachment!== "") {
    const attachementRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await attachementRef.putString(attachment, "data_url");
    // console.log(await response.ref.getDownloadURL()) = deployed url
    attachmentUrl = await response.ref.getDownloadURL();
    };
    const nweetFile = {
      text: nweet,
      creatorId: userObj.uid,
      createdAt: Date.now(),
      attachmentUrl,
    };
    await dbService.collection("nweets").add(
      nweetFile
    );
    setNweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (e) => {
    // console.log(e.target.files);
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finished) => {
      // console.log(finished.currentTarget.result) = local url
      const {
        currentTarget: { result },
      } = finished;
      setAttachment(result);
    };
    if (theFile) {
      reader.readAsDataURL(theFile);
    };
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange}  />
        <input type="submit" value="Nweet" />
        {attachment && (
            <div>
              <img src={attachment} width="100px" height="100px" alt="img" />
              <button onClick={onClearAttachment}>Clear</button>
            </div>
        )}
      </form>
      <div>
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
