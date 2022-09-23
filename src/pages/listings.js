import React, { useEffect, useState } from "react";

import {
  HeaderContainer,
  ListingItemContainer,
  AdvancedSearchContainer,
  FooterContainer,
} from "../containers";
import { Section } from "../components";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Listing = () => {
  const [allProperties, SetallProperties] = useState();
  const [category, setCategory] = useState();
  const [listedIn, setListedIn] = useState();
  const [province, setProvince] = useState();
  const [bedroom, setBedroom] = useState();
  const [bathroom, setBathroom] = useState();
  const [floor, setFloor] = useState();
  const [price, setPrice] = useState();

  const isHome=false
  
  const [searchedProperties, setSearchedProperties] = useState();
  useEffect(() => {
    getProperty();
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

      const allCategories = [
        ...new Set(data.listing.map((property) => property.category)),
      ];
      const allListedIn = [
        ...new Set(data.listing.map((property) => property.listedIn)),
      ];
      const allProvince = [
        ...new Set(data.listing.map((property) => property.province)),
      ];
      const allBedroom = [
        ...new Set(data.listing.map((property) => property.bedroom)),
      ].sort((a, b) => a - b);

      const allBathroom = [
        ...new Set(data.listing.map((property) => property.bathroom)),
      ].sort((a, b) => a - b);

      const allFloor = [
        ...new Set(data.listing.map((property) => property.floor)),
      ].sort((a, b) => a - b);

      const allPrice = [
        ...new Set(data.listing.map((property) => property.price)),
      ].sort((a, b) => a - b);

      SetallProperties(data.listing);
      setCategory(allCategories);
      setListedIn(allListedIn);
      setProvince(allProvince);
      setBedroom(allBedroom);
      setBathroom(allBathroom);
      setFloor(allFloor);
      setPrice(allPrice);

      console.log(allPrice, "Hi");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(searchedProperties);

  if (!searchedProperties) {
    
    if (
      !allProperties ||
      !category ||
      !province ||
      !listedIn ||
      !bedroom ||
      !bathroom ||
      !floor ||
      !price
    ) {
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
              <Section.Flex>
                <Section.FlexItem width="30%" relative flexStart>
                  <Section.Shadow>
                    <AdvancedSearchContainer
                      category={category}
                      listedIn={listedIn}
                      province={province}
                      bedroom={bedroom}
                      bathroom={bathroom}
                      floor={floor}
                      price={price}
                      isHome={isHome}
                      setSearchedProperties={setSearchedProperties}
                    />
                  </Section.Shadow>
                </Section.FlexItem>
                <Section.FlexItem width="65%">

                <Section.Title>Our Property List</Section.Title>
                    <Section.Content>
                    {allProperties.map((featured) => (
                      <ListingItemContainer
                        key={featured._id}
                        featured={featured}
                        width="49%"
                      />
                    ))}
                  </Section.Content>

                  
                  
                </Section.FlexItem>
              </Section.Flex>
            </Section.InnerContainer>
          </Section>
          <FooterContainer />
        </>
      );
    } 



  } else {
      return (
        <>
          <HeaderContainer bg="false" />
          <Section bgColor="--bs-fade-info">
            <Section.InnerContainer>
              <Section.Flex>
                <Section.FlexItem width="30%" relative flexStart>
                  <Section.Shadow>
                    <AdvancedSearchContainer
                      category={category}
                      listedIn={listedIn}
                      province={province}
                      bedroom={bedroom}
                      bathroom={bathroom}
                      floor={floor}
                      price={price}
                      isHome={isHome}
                      setSearchedProperties={setSearchedProperties}
                    />
                  </Section.Shadow>
                </Section.FlexItem>
                <Section.FlexItem width="65%">

                <Section.Title>Search Property List</Section.Title>
                         <Section.Content>
                    {searchedProperties.map((featured) => (
                      <ListingItemContainer
                        key={featured._id}
                        featured={featured}
                        width="49%"
                      />
                    ))}
                  </Section.Content>

                  
                 
                </Section.FlexItem>
              </Section.Flex>
            </Section.InnerContainer>
          </Section>
          <FooterContainer />
        </>
      );
    

  }

   
};

export default Listing;
