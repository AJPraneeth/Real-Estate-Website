import React from "react";

import {
  ChangePasswordContainer,
  DashboardContainer,
  HeaderContainer,
  UserDashboardContainer,
} from "../containers";
import { Section } from "../components";

const Password = () => {
  const admin=localStorage.getItem("isAdmin");
  return (
    <>
      <HeaderContainer />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
        {admin==="true"?(
          <DashboardContainer title="Change Your Password">
            <ChangePasswordContainer />
          </DashboardContainer>

        ):(
          <UserDashboardContainer title="Change Your Password">
            <ChangePasswordContainer />
          </UserDashboardContainer>
        )}

          
        </Section.InnerContainer>
      </Section>
    </>
  );
};

export default Password;
