import { useState, useRef } from "react";

import { Section, Add, Form } from "../components";

import {
  HeaderContainer,
  DashboardContainer,
  FooterContainer,
} from "../containers";

const AddAgents = () => {
  //state

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const [address, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const [imageFile, setImageFile] = useState([]);

  const [faceBook, setFaceBook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [featured, setFeatured] = useState();

  const [load, setLoad] = useState(false);

  //Property details
  const agentDetails = {
    name: name,
    email: email,
    phone: phone,
    description: description,

    address: address,
    city: city,
    province: province,
    image: imageFile,

    faceBook: faceBook,
    instagram: instagram,
    twitter: twitter,
    linkedin: linkedin,
    featured: featured,
  };

  // image process
  const hiddenFileInput = useRef(null);

  const handleFileButton = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    await setImageFile(base64);

    console.log(imageFile);
  };

  //converting to base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //Api call

  const AgentDetails = async (e) => {
    e.preventDefault();
    setLoad(true);
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add-agent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agentDetails),
    });

    const data = await res.json();
    console.log(data.message);
    if (res.status === 400 || !data) {
      setLoad(false);
      window.alert(data.message);
      console.log(data.message);
    } else {
      setLoad(false);
      window.alert(data.message);
      console.log(data.message);
      // history.push("/add-listing");
      window.location.reload();
    }
  };

  console.log(agentDetails);
  return (
    <>
      <HeaderContainer bg={false} />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          <DashboardContainer title="Add Agents">
            <Add>
              <Form>
                {/* <Media /> */}
                <Add.Media>
                  <Add.MediaHeader>
                    <Add.Title>Agent Profile</Add.Title>
                  </Add.MediaHeader>
                  <Add.MediaContent>
                    <Form.FormGroup>
                      <Form.Label>
                        Image
                        <span>(required)</span>
                      </Form.Label>
                      {/* Special input file case */}
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        style={{ display: "none" }}
                        single
                        onChange={(e) => uploadImage(e)}
                      />

                      <div class="container text-center">
                        <div class="row ">
                          <div class="col-lg-6 col-md-6 col-sm-12 ">
                            <img
                              src={imageFile}
                              class="rounded"
                              alt=""
                              width={200}
                              height={200}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="container text-center">
                        <div class="row">
                          <div class="col-lg-6 col-md-6 col-sm-12">
                            <Add.Button onClick={handleFileButton}>
                              Upload Image
                            </Add.Button>
                          </div>
                        </div>
                      </div>
                    </Form.FormGroup>
                  </Add.MediaContent>
                </Add.Media>

                {/* <Descrition /> */}

                <Add.Description>
                  <Add.DescriptionHeader>
                    <Add.Title> Description</Add.Title>
                  </Add.DescriptionHeader>
                  <Add.DescriptionContent>
                    <Add.DescriptionContentTop>
                      <Form.FormGroup>
                        <Form.Label>
                          Name <span>(required)</span>
                        </Form.Label>
                        <Form.Input
                          type="text"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.FormGroup>
                      <Form.FormGroup>
                        <Form.Label>
                          Email <span>(required)</span>
                        </Form.Label>
                        <Form.Input
                          type="email"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.FormGroup>
                      <Form.FormGroup>
                        <Form.Label>
                          Phone <span>(required)</span>
                        </Form.Label>
                        <Form.Input
                          type="text"
                          name="phone"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.FormGroup>
                    </Add.DescriptionContentTop>
                    <Add.DescriptionContentBottom>
                      <Form.FormGroup>
                        <Form.Label>
                          About <span>(required)</span>
                        </Form.Label>
                        <Form.TextArea
                          cols="30"
                          rows="10"
                          name="description"
                          onChange={(e) => setDescription(e.target.value)}
                        ></Form.TextArea>
                      </Form.FormGroup>
                    </Add.DescriptionContentBottom>
                  </Add.DescriptionContent>
                </Add.Description>

                {/* <Location /> */}
                <Add.Location>
                  <Add.LocationHeader>
                    <Add.Title> Location</Add.Title>
                  </Add.LocationHeader>
                  <Add.LocationContent>
                    <Add.LocationContentTop>
                      <Form.FormGroup>
                        <Form.Label>
                          Address <span>(required)</span>
                        </Form.Label>
                        <Form.Input
                          type="text"
                          onChange={(e) => setAdress(e.target.value)}
                        />
                      </Form.FormGroup>
                    </Add.LocationContentTop>
                    <Add.LocationContentBottom>
                      <Form.FormGroup>
                        <Form.Label>
                          City<span>(required)</span>
                        </Form.Label>
                        <Form.Input
                          type="text"
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </Form.FormGroup>
                      <Form.FormGroup>
                        <Form.Label>
                          Province<span>(required)</span>
                        </Form.Label>
                        <Form.Input
                          onChange={(e) => setProvince(e.target.value)}
                        />
                      </Form.FormGroup>
                    </Add.LocationContentBottom>
                  </Add.LocationContent>
                </Add.Location>

                {/* <Details /> */}

                <Add.Details>
                  <Add.DetailsHeader>
                    <Add.Title>Social Media</Add.Title>
                  </Add.DetailsHeader>
                  <Add.DetailsContent>
                    <Form.FormGroup>
                      <Form.Label>FaceBook</Form.Label>
                      <Form.Input
                        type="text"
                        onChange={(e) => setFaceBook(e.target.value)}
                      />
                    </Form.FormGroup>
                    <Form.FormGroup>
                      <Form.Label>Instagram</Form.Label>
                      <Form.Input
                        type="text"
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                    </Form.FormGroup>

                    <Form.FormGroup>
                      <Form.Label>Twitter</Form.Label>
                      <Form.Input
                        type="text"
                        onChange={(e) => setTwitter(e.target.value)}
                      />
                    </Form.FormGroup>

                    <Form.FormGroup>
                      <Form.Label>Linkedin</Form.Label>
                      <Form.Input
                        type="text"
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                    </Form.FormGroup>

                    <Form.FormGroup>
                      <Form.Label>
                        Special Agent<span>(required)</span>
                      </Form.Label>
                      <Form.Select
                        name="none"
                        id=""
                        class="form-select"
                        onChange={(e) => setFeatured(e.target.value)}
                      >
                        <Form.Option Selected>None</Form.Option>
                        <Form.Option value={true}>Yes</Form.Option>
                        <Form.Option value={false}>No</Form.Option>
                      </Form.Select>
                    </Form.FormGroup>
                  </Add.DetailsContent>
                </Add.Details>

                <Add.Footer>
                  {!load ? (
                    <Form.FormGroup class="form-group">
                      <Form.SubmitInput
                        type="submit"
                        value="Submit"
                        onClick={AgentDetails}
                      />
                    </Form.FormGroup>
                  ) : (
                    <button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Submitting...
                  </button>
                  )}
                </Add.Footer>
              </Form>
            </Add>
          </DashboardContainer>
        </Section.InnerContainer>
      </Section>
      <FooterContainer />
    </>
  );
};

export default AddAgents;
