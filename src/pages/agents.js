import React, { useEffect, useState } from "react";

import {
  HeaderContainer,
  AgentItemContainer,
  FooterContainer,
} from "../containers";

import { Section } from "../components";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Agents = () => {
  const [allAgents, setAllAgents] = useState();
  const [allProperty, setAllProperty] = useState();

  useEffect(() => {
    getAllAgents();
    getProperty();
  }, []);

  //Api call

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
        <HeaderContainer bg={false} />
        <Section bgColor="--bs-fade-info">
          <Section.InnerContainer>
            <Section.Header>
              <Section.Title>Our Agents</Section.Title>
              <Section.Text>List of our most trusted agents</Section.Text>
            </Section.Header>
            <Section.Content>
              {allAgents.map((agent) => (
                <AgentItemContainer
                  agent={agent}
                  propertyCount={
                    allProperty.filter((list) => list.agent === agent._id)
                      .length
                  }
                />
              ))}
            </Section.Content>
          </Section.InnerContainer>
        </Section>
        <FooterContainer />
      </>
    );
  }
};

export default Agents;
