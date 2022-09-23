import React, { useState, useEffect } from "react";

import { Dashboard } from "../components";
import { userurls } from "../constants/routes/userurls";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const UserDashboardContainer = ({ title, children }) => {
  const [details, setDetails] = useState();
  const [show, setShow] = useState(false);
  const [pro, setPro] = useState(true);

  const handleDashboardNavigationOpen = () => {
    setShow(true);
    setPro(false);
  };

  const handleDashboardNavigationClose = () => {
    setShow(false);
    setPro(true);
  };

  useEffect(() => {
    getUser();
  }, []);

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

      console.log(details.id);
      setDetails(details);
    } catch (error) {
      console.log(error);
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
      <Dashboard>
        <Dashboard.Header>
          <Dashboard.Title>My profile</Dashboard.Title>
          <Dashboard.SideNav>
            <Dashboard.Button onClick={handleDashboardNavigationOpen}>
              <Dashboard.Icon name="fa fa-bars" />
            </Dashboard.Button>
          </Dashboard.SideNav>
        </Dashboard.Header>
        <Dashboard.Content>
          <Dashboard.Left show={show} pro={pro}>
            <Dashboard.Close>
              <Dashboard.Icon
                onClick={handleDashboardNavigationClose}
                name="fas fa-times"
              />
            </Dashboard.Close>
            <Dashboard.LeftHeader>
            {!details.image?(<Dashboard.Image source="default.jpg" alt="" />):(<Dashboard.Image src={details.image} alt="" />)}

              <Dashboard.Text>
                {/* connect username */}
                {details.name}
              </Dashboard.Text>
            </Dashboard.LeftHeader>

            <Dashboard.LeftContent>
              <Dashboard.List>
                {userurls.map((url) => {
                  return <Links key={url.name} url={url} />;
                })}
              </Dashboard.List>
            </Dashboard.LeftContent>
          </Dashboard.Left>
          <Dashboard.Right>
            <Dashboard.RightHeader>
              <Dashboard.Title>{title}</Dashboard.Title>
            </Dashboard.RightHeader>
            <Dashboard.RightContent>{children}</Dashboard.RightContent>
          </Dashboard.Right>
        </Dashboard.Content>
      </Dashboard>
    );
  }
};

const Links = function ({ url, sublinks }) {
  return (
    <Dashboard.ListItem>
      <Dashboard.Anchor to={url.url}>
        <Dashboard.Icon name={url.icon} />
        <Dashboard.Text>{url.name}</Dashboard.Text>
      </Dashboard.Anchor>
    </Dashboard.ListItem>
  );
};

export default UserDashboardContainer;
