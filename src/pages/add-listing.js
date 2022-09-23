import { useState, useRef, useEffect } from "react";

import { Section, Add, Form } from "../components";

import {
  HeaderContainer,
  DashboardContainer,
  FooterContainer,
} from "../containers";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";



const AddLisiting = () => {
  useEffect(() => {
    getAllAgents();
  }, []);

  //state
  const [load, setLoad] = useState(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [listedIn, setListedIn] = useState("");
  const [description, setDescription] = useState("");

  const [no, setNo] = useState("");
  const [address, setAdress] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const [imageFile, setImageFile] = useState([]);
  const [image1, setImage1] = useState([]);
  const [image2, setImage2] = useState([]);
  const [image3, setImage3] = useState([]);
  const [image4, setImage4] = useState([]);

  const [bedroom, setBedroom] = useState("");
  const [bathroom, setBathroom] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [garage, setGarage] = useState("");
  const [floor, setFloor] = useState("");
  const [amenities, setAmenities] = useState("");

  const [agent, setAgent] = useState("");

  const [allAgents, setAllAgents] = useState();

  //Property details
  const propertyDetails = {
    title: title,
    price: price,
    category: category,
    listedIn: listedIn,
    description: description,

    no: no,
    address: address,
    street: street,
    city: city,
    province: province,
    image: {
      image1: image1,
      image2: image2,
      image3: image3,
      image4: image4,
    },
    bedrooms: bedroom,
    bathrooms: bathroom,
    kitchen: kitchen,
    garage: garage,
    floors: floor,
    amenities: amenities,

    agent: agent,
  };



  // image process
  const hiddenFileInput = useRef(null);

  const handleFileButton = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };

  const uploadImage = async (e) => {
    for (let i = 0; i < 4; i++) {
      if (e.target.files[i]) {
        const file = e.target.files[i];
        const base64 = await convertBase64(file);
        await setImageFile(imageFile.push(base64));
      } else {
        await setImageFile(imageFile.push(undefined));
      }
    }
    console.log(imageFile);
    await setImage1(imageFile[0]);
    await setImage2(imageFile[1]);
    await setImage3(imageFile[2]);
    await setImage4(imageFile[3]);
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

  const LisitingDetails = async (e) => {
    e.preventDefault();
    setLoad(true)
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/add-listing`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyDetails),
      }
    );

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert(data.message);
      console.log(data.message);
      setLoad(false)
    } else {
      setLoad(false)
      window.alert(data.message);
      console.log(data.message);
      // history.push("/add-listing");
      window.location.reload();
    }
  };

  const getAllAgents = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/all-agents`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const agent = await res.json();

      setAllAgents(agent.agents);
    } catch (error) {
      console.log(error);
    }
  };

  if (!allAgents) {
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
      <>
        <HeaderContainer bg={false} />
        <Section bgColor="--bs-fade-info">
          <Section.InnerContainer>
            <DashboardContainer title="Add Property">
              <Add>
                <Form>
                  {/* <Media /> */}
                  <Add.Media>
                    <Add.MediaHeader>
                      <Add.Title>Property Images</Add.Title>
                    </Add.MediaHeader>
                    <Add.MediaContent>
                      <Form.FormGroup>
                        <Form.Label>
                          Images <span>(Select 4 Images at Once)</span>
                          <span>(required)</span>
                        </Form.Label>
                        {/* Special input file case */}
                        <input
                          type="file"
                          ref={hiddenFileInput}
                          style={{ display: "none" }}
                          multiple
                          onChange={(e) => uploadImage(e)}
                        />
                        {image1 && image2 && image3 && image4 ? (
                          <div class="container text-center">
                            <div class="row row-cols-2">
                              <div class="col-lg-3 col-md-4 col-sm-6">
                                <img
                                  src={image1}
                                  class="rounded"
                                  alt="..."
                                  width={200}
                                  height={200}
                                />
                              </div>
                              <div class="col-lg-3 col-md-4 col-sm-6">
                                <img
                                  src={image2}
                                  class="rounded"
                                  alt="..."
                                  width={200}
                                  height={200}
                                />
                              </div>
                              <div class="col-lg-3 col-md-4 col-sm-6">
                                <img
                                  src={image3}
                                  class="rounded"
                                  alt="..."
                                  width={200}
                                  height={200}
                                />
                              </div>
                              <div class="col-lg-3 col-md-4 col-sm-6">
                                <img
                                  src={image4}
                                  class="rounded"
                                  alt="..."
                                  width={200}
                                  height={200}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            {window.alert("Select 4 Images at Once")}
                            {window.location.reload()}
                          </div>
                        )}

                        <div class="container text-center">
                          <div class="row">
                            <div class="col-lg-12 col-md-12  col-sm-12 ">
                              <Add.Button onClick={handleFileButton}>
                                Upload Images
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
                      <Add.Title>Description</Add.Title>
                    </Add.DescriptionHeader>
                    <Add.DescriptionContent>
                      <Add.DescriptionContentTop>
                        <Form.FormGroup>
                          <Form.Label>
                            Property Title <span>(required)</span>
                          </Form.Label>
                          <Form.Input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </Form.FormGroup>
                        <Form.FormGroup>
                          <Form.Label>
                            Property Price <span>(required)</span>
                          </Form.Label>
                          <Form.Input
                            type="Number"
                            name="price"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </Form.FormGroup>
                        <Form.FormGroup>
                          <Form.Label>
                            Category <span>(required)</span>
                          </Form.Label>
                          <Form.Select
                            name="category"
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <Form.Option Selected>None</Form.Option>
                            <Form.Option>Apartment</Form.Option>
                            <Form.Option>House</Form.Option>
                            <Form.Option>Land</Form.Option>
                          </Form.Select>
                        </Form.FormGroup>
                        <Form.FormGroup>
                          <Form.Label>
                            Listed In <span>(required)</span>
                          </Form.Label>
                          <Form.Select
                            name="listedIn"
                            onChange={(e) => setListedIn(e.target.value)}
                          >
                            <Form.Option Selected>None</Form.Option>
                            <Form.Option>Rental</Form.Option>
                            <Form.Option>Sales</Form.Option>
                          </Form.Select>
                        </Form.FormGroup>
                      </Add.DescriptionContentTop>
                      <Add.DescriptionContentBottom>
                        <Form.FormGroup>
                          <Form.Label>
                            Description <span>(required)</span>
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
                      <Add.Title>Property Location</Add.Title>
                    </Add.LocationHeader>
                    <Add.LocationContent>
                      <Add.LocationContentTop>
                        <Form.FormGroup>
                          <Form.Label>
                            Address NO:<span>(required)</span>
                          </Form.Label>
                          <Form.Input
                            type="text"
                            onChange={(e) => setNo(e.target.value)}
                          />
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
                            Street<span>(required)</span>
                          </Form.Label>
                          <Form.Input
                            type="text"
                            onChange={(e) => setStreet(e.target.value)}
                          />
                        </Form.FormGroup>
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
                      <Add.Title>Property Details</Add.Title>
                    </Add.DetailsHeader>
                    <Add.DetailsContent>
                      <Form.FormGroup>
                        <Form.Label>
                          Bedrooms<span>(required)</span>
                        </Form.Label>
                        <Form.Input
                          type="Number"
                          onChange={(e) => setBedroom(e.target.value)}
                        />
                      </Form.FormGroup>
                      <Form.FormGroup>
                        <Form.Label>
                          Bathrooms<span>(required)</span>
                        </Form.Label>
                        <Form.Input
                          type="Number"
                          onChange={(e) => setBathroom(e.target.value)}
                        />
                      </Form.FormGroup>

                      <Form.FormGroup>
                        <Form.Label>
                          Kitchen<span>(required)</span>
                        </Form.Label>
                        <Form.Select
                          name="none"
                          id=""
                          class="form-select"
                          onChange={(e) => setKitchen(e.target.value)}
                        >
                          <Form.Option Selected>None</Form.Option>
                          <Form.Option value="true">Yes</Form.Option>
                          <Form.Option value="false">No</Form.Option>
                        </Form.Select>
                      </Form.FormGroup>

                      <Form.FormGroup>
                        <Form.Label>
                          Garage<span>(required)</span>
                        </Form.Label>
                        <Form.Select
                          name="none"
                          id=""
                          class="form-select"
                          onChange={(e) => setGarage(e.target.value)}
                        >
                          <Form.Option Selected>None</Form.Option>
                          <Form.Option value="true">Yes</Form.Option>
                          <Form.Option value="false">No</Form.Option>
                        </Form.Select>
                      </Form.FormGroup>

                      <Form.FormGroup>
                        <Form.Label>
                          No. of floors<span>(required)</span>
                        </Form.Label>
                        <Form.Input
                          type="Number"
                          onChange={(e) => setFloor(e.target.value)}
                        />
                      </Form.FormGroup>

                      <Form.FormGroup>
                        <Form.Label>
                          Amenities<span>(required)</span>
                        </Form.Label>
                        <Form.Input
                          type="text"
                          onChange={(e) => setAmenities(e.target.value)}
                        />
                      </Form.FormGroup>
                    </Add.DetailsContent>
                  </Add.Details>

                  {/* Agent */}

                  <Add.Details>
                    <Add.DetailsHeader>
                      <Add.Title>Select Agent</Add.Title>
                    </Add.DetailsHeader>
                    <Add.DetailsContent>
                      <Form.FormGroup>
                        <Form.Label>
                          Agent Name<span>(required)</span>
                        </Form.Label>
                        <Form.Select
                          name="none"
                          id=""
                          class="form-select"
                          onChange={(e) => setAgent(e.target.value)}
                        >
                          <Form.Option Selected>None</Form.Option>
                          {allAgents.map((agent) => (
                            <Form.Option value={agent._id}>
                              {agent.Name}
                            </Form.Option>
                          ))}
                        </Form.Select>
                      </Form.FormGroup>
                    </Add.DetailsContent>
                  </Add.Details>

                  <Add.Footer>
                  {!load?(
                         <Form.FormGroup class="form-group">
                         <Form.SubmitInput
                           type="submit"
                           value="Submit Property"
                           onClick={LisitingDetails}
                         />
                       </Form.FormGroup>
                        ):(
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
  }
};

export default AddLisiting;
