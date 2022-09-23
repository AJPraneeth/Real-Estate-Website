import React from "react";
import { useState } from "react";

import { Section, Form } from "../components";

const HomeContactContainer = () => {
  const [load, setLoad] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [title, setTitle] = useState();
  const [message, setMessage] = useState();

  const messageDetails = {
    name: name,
    email: email,
    phone: phone,
    title: title,
    message: message,
    to: "Admin",
  };

  const SendMessage = async (e) => {
    e.preventDefault();
    setLoad(true);
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
      setLoad(false);
    } else {
      setLoad(false);
      window.alert(data.message);
      console.log(data.message);
      restForm(e);

    }
  };

  const restForm = async (e) => {
    e.target.reset();
  };

  console.log(messageDetails);

  return (
    <Section bgColor="--bs-fade-blue">
      <Section.InnerContainer>
        <Section.Header></Section.Header>
        <Section.Content>
          <Section.Flex>
            <Section.FlexItem width="70%">
              <Section.SubTitle size="1">Contact Us</Section.SubTitle>
              <Section.Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non,
                nemo dolorem amet cupiditate sequi cum?
              </Section.Text>
              <Section.Flex>
                <Section.FlexItem width="50%">
                  <Section.SubTitle>We Will Get In Touch</Section.SubTitle>
                  <Section.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Non,
                  </Section.Text>
                </Section.FlexItem>
                <Section.FlexItem width="50%">
                  <Section.SubTitle>
                    Get Instant Support From Us
                  </Section.SubTitle>
                  <Section.Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Non,
                  </Section.Text>
                </Section.FlexItem>
              </Section.Flex>
            </Section.FlexItem>
            <Section.FlexItem width="30%" bg="true">
              <Form id="message">
                <Form.FormGroup>
                  <Form.Input
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Input
                    type="email"
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Input
                    type="text"
                    placeholder="Your Phone Number"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.Input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.FormGroup>
                <Form.FormGroup>
                  <Form.TextArea
                    placeholder="Your Message"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    onChange={(e) => setMessage(e.target.value)}
                  ></Form.TextArea>
                </Form.FormGroup>
                {!load ? (
                  <div class="row">
                    <div class="col-lg-6 col-sm-12">
                    {" "}
                    <Form.FormGroup>
                      <Form.SubmitInput
                        type="submit"
                        value="Send Message"
                        onClick={SendMessage}
                      />
                    </Form.FormGroup>
                    </div>
                    <div class="col-lg-6 col-sm-12">
                    <Form.FormGroup>
                      <Form.ResetButton
                        type="reset"
                        value="Reset Message"
                        
                      />
                      
                    </Form.FormGroup>
                    </div>
                  </div>
                ) : (
                  <button class="btn btn-primary" type="button" disabled>
                    <span
                      class="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Sending...
                  </button>
                )}
              </Form>
            </Section.FlexItem>
          </Section.Flex>
        </Section.Content>
      </Section.InnerContainer>
    </Section>
  );
};

export default HomeContactContainer;
