import React, { useEffect, useState } from "react";

import { Inbox, Form } from "../components";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const MessagesContainer = () => {
  const [allMessages, setAllMessages] = useState();


  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getAllMessage`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      setAllMessages(data.messageDetails);
    } catch (error) {
      console.log(error);
    }
  };
  if (!allMessages) {
    // Loading
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  } else {
    return (
      <Inbox>
        {allMessages.map((message) => (
          <InboxItem key={message._id} message={message}  />
        ))}
      </Inbox>
    );
  }
};

const InboxItem = ({ message }) => {
  const [bodyShown, setBodyShown] = useState(false);
  const [replyShown, setReplyShown] = useState(false);
  const [subject, setSubject] = useState();
  const [body, setBody] = useState();

  useEffect(() => {
    readMessage(message._id);
  }, []);

  const handleReplyShown = () => setReplyShown(true);

  const handleReplyHide = () => setReplyShown(false);

  const handleBodyShown = async(id) => { 
    setBodyShown((prevState) => !prevState);}


  const handleMessageDelete = async(id) => {
    setBodyShown(false);
    const messageID ={
      massageId:id
    }

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/messageDelete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageID),
      }
    );
    const data = await res.json();
  
    if (res.status === 400 || !data) {
       window.alert(data.message);
      console.log(data.message);
    } else {

      console.log(data.message);
      window.location.reload(true);
    }
  };

  

  const readMessage = async(id) => { 
  

    const messageID ={
      massageId:id
    }

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/messageRead`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageID),
      }
    );
    const data = await res.json();
  
    if (res.status === 400 || !data) {
      console.log(data.message);
    } else {
      console.log(data.message);

    }
  
  }


  const replymessage = async() => { 
  

    const ReplyDtails ={
      email:message.clientEmail,
      subject:subject,
      message:body
    }

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/sendEmailAdmin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ReplyDtails),
      }
    );

    const data = await res.json();
  
  }

  return (
  
    <Inbox.Item >
      <Inbox.ItemHeader>
        <Inbox.Text onClick={handleBodyShown}>{message.clientName}</Inbox.Text>
        <Inbox.Text onClick={handleBodyShown}>{message.clientTitle}</Inbox.Text>
        <Inbox.HeaderAction>
          <Inbox.Icon
            onClick={() => handleMessageDelete(message._id)}
            name="fas fa-trash"
          />
          <Inbox.Icon
            onClick={handleBodyShown}
            name={bodyShown ? "fas fa-envelope" : "fas fa-envelope-open"}
            role="open-close"
          />
          {/* <Inbox.Span>Feb 19</Inbox.Span> */}
        </Inbox.HeaderAction>
      </Inbox.ItemHeader>
      {bodyShown && (
        <Inbox.ItemBody>
          <Inbox.BodyContainer>
            <Inbox.BodyTitle>
              <Inbox.Title>{message.clientTitle}</Inbox.Title>
              <Inbox.Text>
                <Inbox.Span special="true">{message.clientName.charAt(0)}</Inbox.Span>
                <Inbox.Span>{message.clientName}</Inbox.Span>
                {" , For"}
                <Inbox.Span>
                 ( {message.to})
                </Inbox.Span>
              </Inbox.Text>
            </Inbox.BodyTitle>
            <Inbox.BodyContent>
              <Inbox.Text>{message.clientMessage}</Inbox.Text>
            </Inbox.BodyContent>
            <Inbox.BodyFooter>
              <Inbox.FooterTitle>
                <Inbox.Button
                  role="reply"
                  onClick={() => handleReplyShown(message._id)}
                >
                  <Inbox.Icon name="fas fa-reply " />
                  Reply
                </Inbox.Button>
                <Inbox.Button
                  role="delete"
                  onClick={() => handleMessageDelete(message._id)}
                >
                  <Inbox.Icon name="fas fa-trash" />
                  Delete
                </Inbox.Button>
              </Inbox.FooterTitle>
              {replyShown && (
                <Inbox.FooterContent>
                  <Form>
                    <Form.FormGroup>
                      <Form.Label>Reply to</Form.Label>
                      <Form.Input value={message.clientEmail} />
                    </Form.FormGroup>
                    <Form.FormGroup>
                      <Form.Input placeholder="Reply title" onChange={e=>setSubject(e.target.value)}/>
                    </Form.FormGroup>
                    <Form.FormGroup>
                      <Form.TextArea
                        placeholder="Reply message"
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        onChange={e=>setBody(e.target.value)}
                      ></Form.TextArea>
                    </Form.FormGroup>
                    <Inbox.Flex>
                      <Form.FormGroup>
                        <Form.SubmitInput value="Send Reply" onClick={replymessage} />
                        <Inbox.Button role="cancel" onClick={handleReplyHide}>
                          Cancel
                        </Inbox.Button>
                      </Form.FormGroup>
                    </Inbox.Flex>
                  </Form>
                </Inbox.FooterContent>
              )}
            </Inbox.BodyFooter>
          </Inbox.BodyContainer>
        </Inbox.ItemBody>
      )}
    </Inbox.Item>

  );
};

export default MessagesContainer;
