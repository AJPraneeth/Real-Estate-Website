import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Section, Add, Form } from "../components";
import { useParams } from "react-router-dom";
import {
  HeaderContainer,
  DashboardContainer,
  FooterContainer,
} from "../containers";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const EditLisiting = () => {
  const history = useHistory();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    getProperty(id);
    getAllAgents();
  }, [id]);

  //state
  const [load, setLoad] = useState(false);
  const [updateTitle, setupdateTitle] = useState();
  const [updatePrice, setupdatePrice] = useState();
  const [updateCategory, setupdateCategory] = useState();
  const [updateListedIn, setupdateListedIn] = useState();
  const [updateDescription, setupdateDescription] = useState();

  const [updateNo, setupdateNo] = useState();
  const [updateAddress, setupdateAddress] = useState();
  const [updateStreet, setupdateStreet] = useState();
  const [updateCity, setupdateCity] = useState();
  const [updateProvince, setupdateProvince] = useState();

  const [imageFile, setImageFile] = useState([]);
  const [updateImage1, setupdateImage1] = useState();
  const [updateImage2, setupdateImage2] = useState();
  const [updateImage3, setupdateImage3] = useState();
  const [updateImage4, setupdateImage4] = useState();

  const [updateBedroom, setupdateBedroom] = useState();
  const [updateBathroom, setupdateBathroom] = useState();
  const [updateKitchen, setupdateKitchen] = useState();
  const [updateGarage, setupdateGarage] = useState();
  const [updateFloor, setupdateFloor] = useState();
  const [updateAmenities, setupdateAmenities] = useState();

  const [updateAgent, setupdateAgent] = useState();

  const [allProperties, setallProperty] = useState();
  const [allAgents, setAllAgents] = useState();

  const [isUpload, setIsUpload] = useState(false);

  //Property details

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
    setIsUpload(true)
    await setupdateImage1(imageFile[0]);
    await setupdateImage2(imageFile[1]);
    await setupdateImage3(imageFile[2]);
    await setupdateImage4(imageFile[3]);
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



  //Api Call

  const UpdateLisitingDetails = async (e) => {
    e.preventDefault();

    const propertyDetails = {
      id: id,
      title: updateTitle,
      price: updatePrice,
      category: updateCategory,
      listedIn: updateListedIn,
      description: updateDescription,

      no: updateNo,
      address: updateAddress,
      street: updateStreet,
      city: updateCity,
      province: updateProvince,

      image: {
        image1: updateImage1,
        image2: updateImage2,
        image3: updateImage3,
        image4: updateImage4,
      },

      bedrooms: updateBedroom,
      bathrooms: updateBathroom,
      kitchen: updateKitchen,
      garage: updateGarage,
      floors: updateFloor,
      amenities: updateAmenities,

      agent: updateAgent,
      prevData: allAgents,
    };

    setLoad (true)
    // console.log(propertyDetails);

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/update-listing`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyDetails),
      }
    );

    const data = await res.json();

    // console.log(data.message, "hi");

    if (res.status === 400 || !data) {
      window.alert(data.message);
      console.log(data.message);
      setLoad (false)
    } else {
      setLoad (false)
      // window.alert(data.message);
      console.log(data.message);

      history.push("/all-listing");
    }
  };

  const getProperty = async (id) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/all-listing`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      const Property = await data.listing.filter((list) => list._id === id);
      setallProperty(Property);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(allProperties);

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

  const CancelUpdate = () => {
    history.push("/all-listing");
  };

  if (!allProperties) {
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
            <DashboardContainer title="Edit Property">
              <Add>
                <Form>
                  {/* <Descrition /> */}

                  <Add.Description>
                    <Add.DescriptionHeader>
                      <Add.Title>Description</Add.Title>
                    </Add.DescriptionHeader>
                    <Add.DescriptionContent>
                      <Add.DescriptionContentTop>
                        <Form.FormGroup>
                          <Form.Label>
                            Property Title 
                          </Form.Label>
                          <Form.Input
                            type="text"
                            name="title"
                            placeholder={allProperties[0].title}
                            onChange={(e) => setupdateTitle(e.target.value)}
                          />
                        </Form.FormGroup>
                        <Form.FormGroup>
                          <Form.Label>
                            Property Price 
                          </Form.Label>
                          <Form.Input
                            type="Number"
                            name="price"
                            placeholder={allProperties[0].price}
                            onChange={(e) => setupdatePrice(e.target.value)}
                          />
                        </Form.FormGroup>
                        <Form.FormGroup>
                          <Form.Label>
                            Category 
                          </Form.Label>
                          <Form.Select
                            name="category"
                            onChange={(e) => setupdateCategory(e.target.value)}
                          >
                            <Form.Option Selected>None</Form.Option>
                            <Form.Option>Apartment</Form.Option>
                            <Form.Option>House</Form.Option>
                            <Form.Option>Land</Form.Option>
                          </Form.Select>
                        </Form.FormGroup>
                        <Form.FormGroup>
                          <Form.Label>
                            Listed In 
                          </Form.Label>
                          <Form.Select
                            name="listedIn"
                            onChange={(e) => setupdateListedIn(e.target.value)}
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
                            Description 
                          </Form.Label>
                          <Form.TextArea
                            cols="30"
                            rows="10"
                            name="description"
                            placeholder={allProperties[0].description}
                            onChange={(e) =>
                              setupdateDescription(e.target.value)
                            }
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
                            Address NO:
                          </Form.Label>
                          <Form.Input
                            type="text"
                            placeholder={allProperties[0].no}
                            onChange={(e) => setupdateNo(e.target.value)}
                          />
                          <Form.Label>
                            Address 
                          </Form.Label>
                          <Form.Input
                            type="text"
                            placeholder={allProperties[0].address}
                            onChange={(e) => setupdateAddress(e.target.value)}
                          />
                        </Form.FormGroup>
                      </Add.LocationContentTop>
                      <Add.LocationContentBottom>
                        <Form.FormGroup>
                          <Form.Label>
                            Street
                          </Form.Label>
                          <Form.Input
                            type="text"
                            placeholder={allProperties[0].street}
                            onChange={(e) => setupdateStreet(e.target.value)}
                          />
                        </Form.FormGroup>
                        <Form.FormGroup>
                          <Form.Label>
                            City
                          </Form.Label>
                          <Form.Input
                            type="text"
                            placeholder={allProperties[0].city}
                            onChange={(e) => setupdateCity(e.target.value)}
                          />
                        </Form.FormGroup>
                        <Form.FormGroup>
                          <Form.Label>
                            Province
                          </Form.Label>
                          <Form.Input
                            placeholder={allProperties[0].province}
                            onChange={(e) => setupdateProvince(e.target.value)}
                          />
                        </Form.FormGroup>
                      </Add.LocationContentBottom>
                    </Add.LocationContent>
                  </Add.Location>

                  {/* <Media /> */}
                  <Add.Media>
                    <Add.MediaHeader>
                      <Add.Title>Property Images</Add.Title>
                    </Add.MediaHeader>
                    <Add.MediaContent>
                      <Form.FormGroup>
                        <Form.Label>
                          Images <span>(Select 4 Images at Once)</span>
                          
                        </Form.Label>
                        {/* Special input file case */}
                        <input
                          type="file"
                          ref={hiddenFileInput}
                          style={{ display: "none" }}
                          multiple
                          onChange={(e) => uploadImage(e)}
                        />
                        {!isUpload ? (
                          <>
                            <div class="container text-center">
                              <div class="row row-cols-2">
                                <div class="col-lg-3 col-md-4 col-sm-6">
                                  <img
                                    src={allProperties[0].image1}
                                    class="rounded"
                                    alt="..."
                                    width={200}
                                    height={200}
                                  />
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6">
                                  <img
                                    src={allProperties[0].image2}
                                    class="rounded"
                                    alt="..."
                                    width={200}
                                    height={200}
                                  />
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6">
                                  <img
                                    src={allProperties[0].image3}
                                    class="rounded"
                                    alt="..."
                                    width={200}
                                    height={200}
                                  />
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-6">
                                  <img
                                    src={allProperties[0].image4}
                                    class="rounded"
                                    alt="..."
                                    width={200}
                                    height={200}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        ) :                       
                            <>
                          <div class="container text-center">
                            <div class="row row-cols-2">
                              <div class="col-lg-3 col-md-4 col-sm-6">
                                <img
                                  src={updateImage1}
                                  class="rounded"
                                  alt="..."
                                  width={200}
                                  height={200}
                                />
                              </div>
                              <div class="col-lg-3 col-md-4 col-sm-6">
                                <img
                                  src={updateImage2}
                                  class="rounded"
                                  alt="..."
                                  width={200}
                                  height={200}
                                />
                              </div>
                              <div class="col-lg-3 col-md-4 col-sm-6">
                                <img
                                  src={updateImage3}
                                  class="rounded"
                                  alt="..."
                                  width={200}
                                  height={200}
                                />
                              </div>
                              <div class="col-lg-3 col-md-4 col-sm-6">
                                <img
                                  src={updateImage4}
                                  class="rounded"
                                  alt="..."
                                  width={200}
                                  height={200}
                                />
                              </div>
                            </div>
                          </div>
                          </>                   
                        }

                        <div class="container text-center">
                          <div class="row">
                            <div class="col-lg-12 col-md-12  col-sm-12 ">
                              <Add.Button onClick={handleFileButton}>
                                Upload Files
                              </Add.Button>
                            </div>
                          </div>
                        </div>
                      </Form.FormGroup>
                    </Add.MediaContent>
                  </Add.Media>

                  {/* <Details /> */}

                  <Add.Details>
                    <Add.DetailsHeader>
                      <Add.Title>Property Details</Add.Title>
                    </Add.DetailsHeader>
                    <Add.DetailsContent>
                      <Form.FormGroup>
                        <Form.Label>
                          Bedrooms
                        </Form.Label>
                        <Form.Input
                          type="Number"
                          placeholder={allProperties[0].bedroom}
                          onChange={(e) => setupdateBedroom(e.target.value)}
                        />
                      </Form.FormGroup>
                      <Form.FormGroup>
                        <Form.Label>
                          Bathrooms
                        </Form.Label>
                        <Form.Input
                          type="Number"
                          placeholder={allProperties[0].bathroom}
                          onChange={(e) => setupdateBathroom(e.target.value)}
                        />
                      </Form.FormGroup>

                      <Form.FormGroup>
                        <Form.Label>
                          Kitchen
                        </Form.Label>
                        <Form.Select
                          name="none"
                          id=""
                          class="form-select"
                          onChange={(e) => setupdateKitchen(e.target.value)}
                        >
                          <Form.Option Selected>None</Form.Option>
                          <Form.Option value="true">Yes</Form.Option>
                          <Form.Option value="false">No</Form.Option>
                        </Form.Select>
                      </Form.FormGroup>

                      <Form.FormGroup>
                        <Form.Label>
                          Garage
                        </Form.Label>
                        <Form.Select
                          name="none"
                          id=""
                          class="form-select"
                          onChange={(e) => setupdateGarage(e.target.value)}
                        >
                          <Form.Option Selected>None</Form.Option>
                          <Form.Option value="true">Yes</Form.Option>
                          <Form.Option value="false">No</Form.Option>
                        </Form.Select>
                      </Form.FormGroup>

                      <Form.FormGroup>
                        <Form.Label>
                          No. of floors
                        </Form.Label>
                        <Form.Input
                          type="Number"
                          placeholder={allProperties[0].floor}
                          onChange={(e) => setupdateFloor(e.target.value)}
                        />
                      </Form.FormGroup>

                      <Form.FormGroup>
                        <Form.Label>
                          Amenities
                        </Form.Label>
                        <Form.Input
                          type="text"
                          placeholder={allProperties[0].amenities}
                          onChange={(e) => setupdateAmenities(e.target.value)}
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
                          Agent Name
                        </Form.Label>
                        <Form.Select
                          name="none"
                          id=""
                          class="form-select"
                          onChange={(e) => setupdateAgent(e.target.value)}
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
                    {!load?(<>
                      <Form.FormGroup class="form-group">
                      <Form.SubmitInput
                        type="submit"
                        value="Update Property"
                        onClick={UpdateLisitingDetails}
                      />
                    </Form.FormGroup>

                    <Form.FormGroup class="form-group">
                      <Form.SubmitInput
                        type="submit"
                        value="Cancel Update"
                        onClick={CancelUpdate}
                      />
                    </Form.FormGroup>
                    </>):(
                     <button class="btn btn-primary" type="button" disabled>
                     <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                     Updating...
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

export default EditLisiting;
