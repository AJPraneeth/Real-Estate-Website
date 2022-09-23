import React, { useEffect, useState } from "react";

import { Section } from "../components";
import { ListingItemContainer } from "./index";
import { useHistory } from "react-router-dom";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const FeaturedListingContainer = () => {
  const history = useHistory();

  const [featuredProperty, setFeaturedProperty] = useState();

  useEffect(() => {
    getProperty()
  }, []);

  const getProperty = async () => {
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
      const filterProperty = data.listing.filter(
        (listing) => listing.featured === true
      );
      const featuredPropertyData = filterProperty.slice(0, 3);
     
      setFeaturedProperty(featuredPropertyData);
    } catch (error) {
      console.log(error);
    }
  };

  
  const moreListing = () => {
    history.push("/listing");
  };

  if (!featuredProperty) {
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
      <Section bgColor="--bs-light">
        <Section.InnerContainer>
          <Section.Header>
            <Section.Title>Our Featured Listing</Section.Title>
          </Section.Header>
          <Section.Content>
            {featuredProperty.map((featured) => (
              <ListingItemContainer key={featured.id} featured={featured} />
            ))}
          </Section.Content>
          <Section.Footer>
            <Section.Button onClick={moreListing}>More Listing</Section.Button>
          </Section.Footer>
        </Section.InnerContainer>
      </Section>
    );
  }
};

export default FeaturedListingContainer;
