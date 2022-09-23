import React from "react";
import { Section } from "../components";

import {
  HeaderContainer,
  DashboardContainer,
  UserDashboardContainer,
  ProfileContainer,
} from "../containers";

const UserProfile = () => {
const admin=localStorage.getItem("isAdmin");
  return (
    <>
      <HeaderContainer />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
        {admin==="true"?(
          <DashboardContainer title="My Account">
          <ProfileContainer />
        </DashboardContainer>

        ):(
          <UserDashboardContainer title="My Account">
          <ProfileContainer />
        </UserDashboardContainer>

        )}

        
        </Section.InnerContainer>
      </Section>
    </>
  );
};

export default UserProfile;
