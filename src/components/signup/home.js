import React from "react";
import {
  HeaderContainer,
  FeaturedListingContainer,
  FeaturedAgentsContainer,
  HomeContactContainer,
  FooterContainer,
} from "../containers";

const Home = () => {
  const loging = localStorage.getItem("isLoggedIn");
  return (
    <>
      <HeaderContainer bg="true" source="/images/banners/banner4.jpg" />

      {loging === "true" ? (
        <>
          <FeaturedListingContainer />
          <FeaturedAgentsContainer />
          <HomeContactContainer />
        </>
      ) : (
        <>
          <FeaturedListingContainer />
        </>
      )}

      <FooterContainer />
    </>
  );
};

export default Home;
