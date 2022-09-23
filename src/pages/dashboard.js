import React, { useEffect, useState } from "react";
import {
  HeaderContainer,
  DashboardContainer,
  FooterContainer,
} from "../containers";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { Section, Summary } from "../components";
import BarGraph from "../helpers/graphs";


const Dashboard = () => {
  const [allAgents, setAllAgents] = useState();
  const [allProperty, setAllProperty] = useState();

  useEffect(() => {
    getAllAgents();
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

      setAllProperty(data.listing);
    } catch (error) {
      console.log(error);
    }
  };

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

  if (!allProperty || !allAgents) {
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
        <HeaderContainer />
        <Section bgColor="--bs-fade-info">
          <Section.InnerContainer>
            <DashboardContainer title="Agency Summaries">
              <Summary.Top>
                <Summary.Anchor to="/dashboard_properties" bg="var(--bs-teal)">
                  <Summary.AnchorDiv>
                    <Summary.Title>{allProperty.length}</Summary.Title>
                    <Summary.Text>All Properties</Summary.Text>
                  </Summary.AnchorDiv>
                  <Summary.AnchorDiv>
                    <Summary.Icon name="fas fa-map-marker-alt" />
                  </Summary.AnchorDiv>
                </Summary.Anchor>
                <Summary.Anchor to="/dashboard_agents" bg="var(--bs-pink)">
                  <Summary.AnchorDiv>
                    <Summary.Title>{allAgents.length}</Summary.Title>
                    <Summary.Text>All Agents</Summary.Text>
                  </Summary.AnchorDiv>
                  <Summary.AnchorDiv>
                    <Summary.Icon name="fas fa-users" />
                  </Summary.AnchorDiv>
                </Summary.Anchor>
              </Summary.Top>
              <Summary.Bottom>
                <Summary.BottomHeader>
                  <Summary.Title>Properties By Category</Summary.Title>
                </Summary.BottomHeader>
                <Summary.BottomContent>
                  <BarGraph properties={allProperty} />
                </Summary.BottomContent>
              </Summary.Bottom>
            </DashboardContainer>
          </Section.InnerContainer>
        </Section>
        <FooterContainer />
      </>
    );
  }
};

export default Dashboard;
