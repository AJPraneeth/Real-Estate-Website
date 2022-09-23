import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { HeaderContainer, FooterContainer } from "../containers";
import { Signup, Form } from "../components";

const Signupp = () => {

  const history=useHistory();

  const [user,setUser]=useState({
    name:"",email:"",password:"",confirmPassword:"",phone:"",address:"",city:"",province:""
  })
let name,value;
  const handleInputs=(e)=>{ 
    name =e.target.name;
    value=e.target.value;

    setUser({...user,[name]:value})
  }

  
const Postdata=async(e)=>{

   e.preventDefault();

  const userData={
    name:user.name,
    email:user.email,
    password:user.password,
    confirmPassword:user.confirmPassword,
    phone:user.phone,
    address:user.address,
    city:user.city,
    province:user.province,

  }
console.log(userData);

  const res= await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(userData)
  });

  const data=  await res.json();

  console.log(data.message,"hi");
 
  if (res.status===422||!data) {
    window.alert(data.message)
    console.log(data.message);
  
  }
  else {
    window.alert(data.message)
    console.log(data.message);
    history.push("/login")
  }
 
}

  return (
    <Fragment>
      <HeaderContainer bg="false" />
      <Signup>
        <Signup.Container>
          <Signup.Content>
            <Signup.Header>
              <Signup.Title>Signup</Signup.Title>
            </Signup.Header>
            <Signup.InnerContent>
              <Form method="POST">
                <Form.FormGroup>
                  <Form.Label>Name</Form.Label>
                  <Form.Input type="text" name="name" value={user.name} onChange={handleInputs}/>
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Email</Form.Label>
                  <Form.Input type="email" name="email" value={user.email} onChange={handleInputs} />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Password</Form.Label>
                  <Form.Input type="password" name="password" value={user.password} onChange={handleInputs}/>
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Input type="password" name="confirmPassword" value={user.confirmPassword}  onChange={handleInputs}/>
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.Label>Phone No</Form.Label>
                  <Form.Input type="text" name="phone" value={user.phone}  onChange={handleInputs}/>
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Address</Form.Label>
                  <Form.Input type="text" name="address" value={user.address}  onChange={handleInputs}/>
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>City</Form.Label>
                  <Form.Input type="text" name="city" value={user.city}  onChange={handleInputs}/>
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Label>Province</Form.Label>
                  <Form.Input type="text" name="province" value={user.province}  onChange={handleInputs}/>
                </Form.FormGroup>
                
                

                <Form.FormGroup>
                  <Form.SubmitInput type="submit" value="Signup" onClick={Postdata} />
                </Form.FormGroup>
              </Form>
            </Signup.InnerContent>
            <Signup.Footer>
              <Signup.Text>
                Already Have Account ?{" "}
                <Signup.Anchor to="/login">Login</Signup.Anchor>
              </Signup.Text>
            </Signup.Footer>
          </Signup.Content>
        </Signup.Container>
      </Signup>
      <FooterContainer />
    </Fragment>
  );
};

export default Signupp;
