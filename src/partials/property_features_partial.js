import React, { useState } from "react";
import { Property } from "../components";
export const PropertGallery = ({ image }) => {
  return (
    <Property.Gallery>
      <Property.ImageContainer>
        <Property.Image src={image.image1} />
      </Property.ImageContainer>
      <Property.ImageContainer>
        <Property.Image src={image.image2} />
      </Property.ImageContainer>
      <Property.ImageContainer>
        <Property.Image src={image.image3} />
      </Property.ImageContainer>
      <Property.ImageContainer>
        <Property.Image src={image.image4} />
      </Property.ImageContainer>
    </Property.Gallery>
  );
};

export const PropertyFeatures = ({ features }) => {
  const [featuresShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };

  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Details and Features</Property.InfoTitle>
        <Property.Icon
          name={featuresShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent contentShown={featuresShown}>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Bedrooms : </Property.Span>
            {features.bedroom}
          </Property.Text>
          <Property.Text>
            <Property.Span>Bathrooms : </Property.Span>
            {features.bathroom}
          </Property.Text>
          <Property.Text>
            <Property.Span>Garage : </Property.Span>
            {features.garage==="true"?"Yes" : "No"}
          </Property.Text>
        </Property.InfoItem>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Kitchen : </Property.Span>
            {features.kitchen ? "Availalbe" : "Not Available"}
          </Property.Text>
          <Property.Text>
            <Property.Span>No of Floors : </Property.Span>
            {features.floor}
          </Property.Text>
        </Property.InfoItem>

        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Status : </Property.Span>
            {features.Status ? "Active" : "Not Active"}
          </Property.Text>
          
        </Property.InfoItem>
        
      </Property.InfoContent>
    </Property.Info>
  );
};

export const PropertyAmenities = ({ amenities }) => {
  const [amenitiesShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };

  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Amenities</Property.InfoTitle>
        <Property.Icon
          name={amenitiesShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent contentShown={amenitiesShown}>
      <Property.InfoItem key={amenities}>
            <Property.Text>{amenities}</Property.Text>
          </Property.InfoItem>
          
        {/* {amenities.map((amenity) => (
          <Property.InfoItem key={amenity}>
            <Property.Text>{amenity}</Property.Text>
          </Property.InfoItem>
        ))} */}
      </Property.InfoContent>
    </Property.Info>
  );
};

export const PropertyAddress = ({ address }) => {
  const [addressShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };
  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Address</Property.InfoTitle>
        <Property.Icon
          name={addressShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent contentShown={addressShown}>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Address : </Property.Span>
            {address.address}
          </Property.Text>
          <Property.Text>
            <Property.Span>City : </Property.Span>
            {address.city}
          </Property.Text>
        </Property.InfoItem>
        <Property.InfoItem>
          <Property.Text>
            <Property.Span>Province : </Property.Span>
            {address.province}
          </Property.Text>
          <Property.Text>
            <Property.Span>Street : </Property.Span>
            {address.street}
          </Property.Text>
        </Property.InfoItem>

        {/* <Property.InfoItem>
          <Property.Text>
            <Property.Span>Area : </Property.Span>
            {address.area}
          </Property.Text>
        </Property.InfoItem> */}
      </Property.InfoContent>
    </Property.Info>
  );
};
export const PropertyDescription = ({ description }) => {
  const [descriptionShown, setContentShown] = useState(false);

  const contentHandler = () => {
    setContentShown((previousState) => !previousState);
  };
  return (
    <Property.Info>
      <Property.InfoHeader onClick={contentHandler}>
        <Property.InfoTitle>Property Description</Property.InfoTitle>
        <Property.Icon
          name={descriptionShown ? "fas fa-chevron-up" : "fas fa-chevron-down"}
          info></Property.Icon>
      </Property.InfoHeader>
      <Property.InfoContent block="true" contentShown={descriptionShown}>
        <Property.Text>{description}</Property.Text>
      </Property.InfoContent>
    </Property.Info>
  );
};
