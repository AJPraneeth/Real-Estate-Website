import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { Password, Form } from "../components";

const ChangePasswordContainer = () => {

  const history=useHistory();

  const email = localStorage.getItem("email");

  const changeJWTtokens=()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("isAdmin", false);
  }


  const changePassword = async (e) => {
    console.log("ssss");

    e.preventDefault();

  

    const form = e.target;

    const userData = {
      email: email,
      password: form[1].value,
      confirmPassword:form[2].value
    };

    console.log(userData);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data= await res.json();

    if (res.status===400||!data) {
      window.alert(data.message)
       console.log(data.message);
    
    }
    else {
      window.alert(data.message)
      console.log(data.message);
      changeJWTtokens()
       history.push("/login")
    }
   

  };

  return (
    <Password>
      <Form onSubmit={event=>changePassword(event)} >
        <Form.FormGroup>
          <Form.Label>Your Email</Form.Label>
          <Form.Input type="email" value={email} />
        </Form.FormGroup>
        <Form.FormGroup>
          <Form.Label>New Password</Form.Label>
          <Form.Input
            type="password"
            name="password"
           
          />
        </Form.FormGroup>
        <Form.FormGroup>
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Input
            type="password"
            name="confirmPassword"
          
          />
        </Form.FormGroup>
        <Form.FormGroup>
          <Form.SubmitInput type="submit" value="Change Password"  />
        </Form.FormGroup>
      </Form>
    </Password>
  );
};

export default ChangePasswordContainer;
