import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import { HeaderContainer, FooterContainer } from "../containers";
import { Login, Form } from "../components";

const Loginn = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isAdmin, setIsAdmin] = useState();

  const [load, setLoad] = useState(false);

  const handleLoging = async (e) => {
    e.preventDefault();
setLoad(true)
    const form = e.target;

    const user = {
      email: form[0].value,
      password: form[1].value,
    };

    console.log(user, "logingdata");

    try {
      
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.status === 404) {
        setLoad(false)
        setIsAdmin(false)
        setIsLoggedIn(false)
        window.alert(data.message)
        console.log(data.message)
      }
      if (res.status === 200) {
        setLoad(false)
        localStorage.setItem("token", data.token);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("isAdmin", data.admin);
        localStorage.setItem("email", data.email);

  
        // window.alert(data.message)
        console.log(data.message)
        history.push("/");
          
      }
    } catch (error) {
      console.error("Error:", error);
    }

    
  };

  const authenticate = async () => {
    const token =localStorage.getItem("token");
    if (token !== null) {
      console.log(token);
      try {
        const _data = await fetch("http://localhost:4000/auth", {
          headers: {
            "x-access-token": token,
          },
        });
        const data = await _data.json();

        if (_data.status === 404) {
        
          console.log("404");
        }

        if (_data.status === 200) {
            history.push("/");
          console.log(data);
          
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <Fragment>
      <HeaderContainer bg="false" isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
      <Login>
        <Login.Container>
          <Login.Content>
            <Login.Header>
              <Login.Title>Login</Login.Title>
            </Login.Header>
            <Login.InnerContent>
              <Form onSubmit={(event) => handleLoging(event)}>
                <Form.FormGroup>
                  <Form.Label>Email</Form.Label>
                  <Form.Input type="email" />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Password</Form.Label>
                  <Form.Input type="password" />
                </Form.FormGroup>
{!load?(<Form.FormGroup>
                  <Form.SubmitInput type="submit" value="Login" />
                </Form.FormGroup>):(
                  <button class="btn btn-primary" type="button" disabled>
                  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  Logging...
                </button>
                )}
                

              </Form>
            </Login.InnerContent>
            <Login.Footer>
              <Login.Text>
                <Login.Anchor to="/forgot-password">
                  Forgot Password ?
                </Login.Anchor>
              </Login.Text>
              <Login.Text>
                Don't have an Account ?{" "}
                <Login.Anchor to="/signup">Sign Up</Login.Anchor>
              </Login.Text>
            </Login.Footer>
          </Login.Content>
        </Login.Container>
      </Login>
      <FooterContainer />
    </Fragment>
  );
};

export default Loginn;
