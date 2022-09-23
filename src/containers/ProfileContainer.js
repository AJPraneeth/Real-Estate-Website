import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Profile, Form } from "../components";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const ProfileContainer = () => {
  const history = useHistory();
  const email = localStorage.getItem("email");

  const hiddenFileInput = useRef(null);
  const [load, setLoad] = useState(false);
  const [details, setDetails] = useState();
  const [imageUpload, setImageUpload] = useState(false);

  const [name, SetName] = useState();
  const [phone, SetPhone] = useState();
  const [address, SetAddress] = useState();
  const [city, SetCity] = useState();
  const [province, SetProvince] = useState();
  const [about, SetAbout] = useState();
  const [imageFile, SetImageFile] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };

  const updateData = {
    email: email,
    name: name,
    phone: phone,
    address: address,
    city: city,
    province: province,
    about: about,
    image: imageFile,
  };

  useEffect(() => {
    getUser();
  }, []);

  //image Process
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    SetImageFile(base64);

    setImageUpload(true);
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

  const getUser = async () => {
    const email = localStorage.getItem("email");
    const emails = {
      email: email,
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/getUserDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emails),
        }
      );

      const details = await res.json();

      setDetails(details);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    setLoad(true);
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/updateUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      window.alert(data.message);
      console.log(data.message);
      setLoad(false);
    } else {
      setLoad(false);
      // window.alert(data.message);
      console.log(data.message);

      history.push("/profile");
    }
  };

  if (!details) {
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
      <Profile>
        <Form>
          <Profile.Avatar>
            <Profile.Title>Choose Avatar</Profile.Title>
            <Profile.AvatarContent>
              {!imageUpload ? (
                !details.image ? (
                  <Profile.Image source="default.jpg" />
                ) : (
                  <Profile.Image src={details.image} />
                )
              ) : (
                <Profile.Image src={imageFile} />
              )}
              {/* Special file input case */}

              <input
                type="file"
                style={{ display: "none" }}
                ref={hiddenFileInput}
                multiple
                onChange={(e) => uploadImage(e)}
              />

              <Profile.Button onClick={handleClick}>
                Choose File To Upload
              </Profile.Button>
            </Profile.AvatarContent>
          </Profile.Avatar>
          <Profile.Bio>
            <Profile.BioTop>
              <Form.FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Input
                  type="text"
                  placeholder={details.name}
                  onChange={(e) => SetName(e.target.value)}
                />
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.Label>Email</Form.Label>
                <Form.Input type="text" value={email} />
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.Label>Phone</Form.Label>
                <Form.Input
                  type="text"
                  placeholder={details.phone}
                  onChange={(e) => SetPhone(e.target.value)}
                />
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.Label>Address</Form.Label>
                <Form.Input
                  type="text"
                  placeholder={details.address}
                  onChange={(e) => SetAddress(e.target.value)}
                />
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.Label>City</Form.Label>
                <Form.Input
                  type="text"
                  placeholder={details.city}
                  onChange={(e) => SetCity(e.target.value)}
                />
              </Form.FormGroup>
              <Form.FormGroup>
                <Form.Label>Province</Form.Label>
                <Form.Input
                  type="text"
                  placeholder={details.province}
                  onChange={(e) => SetProvince(e.target.value)}
                />
              </Form.FormGroup>
            </Profile.BioTop>

            <Profile.BioBottom>
              <Form.FormGroup>
                <Form.Label>About</Form.Label>
                <Form.TextArea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder={details.about}
                  onChange={(e) => SetAbout(e.target.value)}
                ></Form.TextArea>
              </Form.FormGroup>
            </Profile.BioBottom>
          </Profile.Bio>
          {!load ? (
            <Form.FormGroup>
              <Form.SubmitInput value="Save Changes" onClick={updateUser} />
            </Form.FormGroup>
          ) : (
            <button class="btn btn-primary" type="button" disabled>
              <span
                class="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Updating...
            </button>
          )}
        </Form>
      </Profile>
    );
  }
};

export default ProfileContainer;
