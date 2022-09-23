import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { Section, Property } from "../components";
import {
  HeaderContainer,
  ContactAgentContainer,
  PropertyRelatedContainer,
  FooterContainer,
} from "../containers";

import {
  PropertGallery,
  PropertyAddress,
  PropertyAmenities,
  PropertyFeatures,
  PropertyDescription,
} from "../partials/property_features_partial";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Listing = () => {
  const { id } = useParams();



  const [property, setProperty] = useState();
  const [featuredProperties, setFeaturedProperties] = useState();
  const [propertyAgent, setpropertyAgent] = useState();
  const[agentId,setAgentId]=useState ()

  useEffect(() => {
    getProperty(id);
    getAllAgents(agentId);
  }, [id,agentId]);

  // new

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
      const filteredFeatured = await data.listing.filter(
        (property) => property._id !== id
      );
      setAgentId(Property[0].agent);
      
      setProperty(Property);
      setFeaturedProperties(filteredFeatured);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getAllAgents = async (agentId) => {
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
      const filterAgent = await agent.agents.filter(
        (agent) => agent._id === agentId
      );
      
      setpropertyAgent(filterAgent);

    } catch (error) {
      console.log(error);
    }
  };
 

  if (!property || !featuredProperties || !propertyAgent || !agentId) {
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
        <HeaderContainer bg="false" />
        <Section bgColor="--bs-fade-info">
          <Section.InnerContainer>
            <Property.Header>
              <Property.HeaderLeft>
                <Property.Title>{property[0].title}</Property.Title>
                <Property.Location>
                  <Property.Icon name="fas fa-map-marker-alt"></Property.Icon>
                  <Property.Text>{property[0].city}</Property.Text>
                </Property.Location>
              </Property.HeaderLeft>
              <Property.HeaderRight>
                <Property.Title>
                  Rs: {"   "}
                  {property[0].price}
                  <Property.Span>
                    {property[0].listedIn === "Rental" ? "/ Month" : ""}
                  </Property.Span>
                </Property.Title>
              </Property.HeaderRight>
            </Property.Header>
            <Property.Content>
              <Property.Left>
                <PropertGallery image={property[0]} />
                <PropertyFeatures features={property[0]} />
                <PropertyAmenities amenities={property[0].amenities} />
                <PropertyAddress address={property[0]} />
                <PropertyDescription
                  description={property[0].description}
                />
              </Property.Left>
              <Property.Right>
                <ContactAgentContainer property={propertyAgent[0]} />
                <PropertyRelatedContainer
                  // property={property}
                  featured={featuredProperties}
                />
              </Property.Right>
            </Property.Content>
          </Section.InnerContainer>
        </Section>
        <FooterContainer />
      </>
    );
  }
};

export default Listing;
