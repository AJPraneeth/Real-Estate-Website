import React from "react";
import { Property, Form } from "../components";
import { useState } from "react";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
const ContactAgentContainer = ({ property }) => {

  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [phone,setPhone]=useState()
  const [title,setTitle]=useState()
  const [message,setMessage]=useState()

 

   const SendMessage=async(e)=>{

    e.preventDefault();

    const messageDetails ={
      name:name,
      email:email,
      phone:phone,
      title:title,
      message:message,
      to:property.Name
     }
     console.log(messageDetails);
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageDetails),
      }
    );
    const data = await res.json();
  
    if (res.status === 400 || !data) {
      window.alert(data.message);
      console.log(data.message);
    } else {
      window.alert(data.message);
      console.log(data.message);
      
   
      window.location.reload();
    }
  
   }

   


  if (!property) {
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
    <Property.Contact>
      <Property.ContactHeader>
        <Property.ContactItem>
          <Property.AgentImage
            src={property.image
              // property.agent.image ? property.agent.image : property.agent.photo
            }
          />
        </Property.ContactItem>
        <Property.ContactItem>
          <Property.Subtitle >{property.Name}</Property.Subtitle>
          <Property.ContactList>
            <Property.ListItem>
              <Property.Icon name="fas fa-phone-alt"></Property.Icon>
              <Property.Text>{property.phone}</Property.Text>
            </Property.ListItem>
          </Property.ContactList>
        </Property.ContactItem>
      </Property.ContactHeader>
      <Property.ContactContent>
        <Property.ContactContainer>
          <Form>
            <Form.FormGroup>
              <Form.Input type="text" placeholder="Name" onChange={e=>setName(e.target.value)}/>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Input type="text" placeholder="Email"  onChange={e=>setEmail(e.target.value)}/>
            </Form.FormGroup>

            <Form.FormGroup>
              <Form.Input type="text" placeholder="Phone Number" onChange={e=>setPhone(e.target.value)}  />
            </Form.FormGroup>
            <Form.FormGroup>
                  <Form.Input type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)} />
                </Form.FormGroup>
            <Form.FormGroup>
              <Form.TextArea
                placeholder="I would love to know more about this property"
                name=""
                id=""
                cols="24"
                rows="8"
                onChange={e=>setMessage(e.target.value)}></Form.TextArea>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.SubmitInput type="submit" value="Send Message" onClick={SendMessage} />
            </Form.FormGroup>
          </Form>
        </Property.ContactContainer>
      </Property.ContactContent>
    </Property.Contact>
  );
          }
};

export default ContactAgentContainer;
