import React, { useState, useRef,useEffect } from "react";
import {
  Segment,
  Header,
  Icon,
  Comment,
  Form,
  Input,
  Button,
  StepContent,
} from "semantic-ui-react";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import Message from "./Message";

const { uuid } = require("uuidv4");

const ChatPanel = ({ currentChannel }) => {
  useFirebaseConnect([
    {
      path: `/messages/${currentChannel.key}`,
      storeAs: "channelMessages",
    },
  ]);
  const firebase = useFirebase();
  const profile = useSelector((state) => state.firebase.profile);
  const currentUserUid = useSelector((state) => state.firebase.auth.uid);
  const channelMessages = useSelector(
    (state) => state.firebase.ordered.channelMessages
  );
  const [searchTerm, setSearchTerm] = useState("");

  const [content, setContent] = useState("");

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(()=>{
      //!!Slider 'ın otomatik olarak aşağıda inmesi için referanse oluşturup , ilk render işleminde scroll edilmesini sağladık.
      messagesEndRef.current.scrollIntoView({
          behaviour : "smooth",
          block : "end",
      })
  })

  const handleSubmit = (event) => {
    event.preventDefault();

    if (content !== "") {
      const message = {
        content,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          id: currentUserUid,
          name: profile.name,
          avatar: profile.avatar,
        },
      };

      firebase
        .push(`messages/${currentChannel.key}`, message)
        .then(() => setContent(""));
    }
  };

  const uploadMedia = (event) => {
    const file = event.target.files[0];

    if (file) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`chat/public/${uuid()}.jpg`);

      return fileRef
        .put(file)
        .then((snap) => {
          fileRef.getDownloadURL().then((downloadURL) => {
            sendMediaMessage(downloadURL);
          });
        })
        .catch((err) => console.error("Error uploading file " + err.payload));
    }
  };

  const sendMediaMessage = (url) => {
    const message = {
      image: url,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUserUid,
        name: profile.name,
        avatar: profile.avatar,
      },
    };

    firebase.push(`messages/${currentChannel.key}`, message).then(() => {
      console.log("Media message send");
    });
  };

  const filterMessages = () => {

    const regex = new RegExp(searchTerm,"gi");

    const searchResults = [...channelMessages].reduce((acc,message) => {
        if(message.value.content && message.value.content.match(regex) || message.value.user && message.value.user.name.match(regex)){
            acc.push(message)
        }

        return acc;
    },[])

    return searchResults;
  }

 const renderedMessages = searchTerm !== "" ? filterMessages() : channelMessages

  return (
    <>
      {/* Messsages Header */}
      <Segment clearing>
        <Header as="h3" floated="left">
          <span>
            <Icon name="hashtag"></Icon>
            {currentChannel.name}
          </span>
        </Header>
        {/* Search Messages */}
        <Header as="h3" floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Mesajlarda ara"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          ></Input>
        </Header>
      </Segment>
      {/* Messages  */}

      <Segment style={{ position: "fixed", top: 55, bottom: 70, width: "81%" }}>
        <Comment.Group
          style={{
            height: "80Vh",
            overflowY: "auto",
            maxWidth: "100%",
          }}
        >
          {renderedMessages &&
            renderedMessages.map(({ key, value }) => (
              <Message key={key} message={value}></Message>
            ))}

            <div ref = {messagesEndRef}></div>
        </Comment.Group>
      </Segment>

      {/* Sent new message  */}
      <Segment
        style={{
          position: "fixed",
          bottom: 0,
          width: "85%",
          display: "flex",
        }}
      >
        <Button icon>
          <Icon name="add"></Icon>
          <Input
            type="file"
            name="file"
            ref={fileInputRef}
            onChange={uploadMedia}
          ></Input>
        </Button>
        <Form onSubmit={handleSubmit} style={{ flex: "1" }}>
          <Input
            fluid
            name="message"
            value={content}
            labelPosition="left"
            onChange={(event) => setContent(event.target.value)}
            placeholder={`# ${currentChannel.name} kanalına mesaj gönder.`}
          ></Input>
        </Form>
      </Segment>
    </>
  );
};

export default ChatPanel;
