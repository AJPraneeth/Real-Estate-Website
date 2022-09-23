import React, { Fragment,useState } from "react";

import { HeaderContainer, FooterContainer } from "../containers";
import { useHistory } from "react-router-dom";
import { Forgot, Form } from "../components";

const Forgott = () => {
  const history = useHistory();
  const [user,setUser]=useState({email:""})

let value;
  const handleInputs=(e)=>{ 
    
    
    console.log(e.target.value);
    setUser({email:e.target.value})
    console.log(user);
  }


  const changeJWTtokens=()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("isAdmin", false);
  }


  const handlePasswordReset = async (e) => {
    e.preventDefault();


    const userData = {
      email: user.email,
      
    };

    console.log(userData, "logingdata");

    try {
      
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (res.status === 400) {
        window.alert(data.message)
        console.log(data.message)
      }
      else {
        window.alert(data.message)
        console.log(data.message)
        changeJWTtokens()
         history.push("/login");
          
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  return (
    <Fragment>
      <HeaderContainer bg="false" />
      <Forgot>
        <Forgot.Container>
          <Forgot.Content>
            <Forgot.Header>
              <Forgot.Title>Reset Your Password</Forgot.Title>
            </Forgot.Header>
            <Forgot.InnerContent>
              <Form>
                <Form.FormGroup>
                  <Form.Label>Email</Form.Label>
                  <Form.Input type="email" name="email"   onChange={handleInputs} />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.SubmitInput type="submit" value="Send Reset Token" onClick={handlePasswordReset} />
                </Form.FormGroup>
              </Form>
            </Forgot.InnerContent>
          </Forgot.Content>
        </Forgot.Container>
      </Forgot>
      <FooterContainer />
    </Fragment>
  );
};

export default Forgott;
