import React, { useEffect, useState } from "react";

import { Section } from "../components";
import { AgentItemContainer } from "../containers";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const FeaturedAgentsContainer = () => {
  const [featuredAgents, setFeaturedAgents] = useState();
  const [allProperty, setAllProperty] = useState();

  useEffect(() => {
    getAllAgents();
    getProperty();
  }, []);

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
      const filterAgent = agent.agents.filter(
        (agent) => agent.featured === true
      );
      const featuredData = filterAgent.slice(0, 3);

      setFeaturedAgents(featuredData);
    } catch (error) {
      console.log(error);
    }
  };

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
  console.log(allProperty);


  if (!featuredAgents || !allProperty ) {
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
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          <Section.Header>
            <Section.Title>Our Featured Agents</Section.Title>
          </Section.Header>
          <Section.Content>
            {featuredAgents.map((agents) => (
              <AgentItemContainer
                key={agents._id}
                agent={agents}
                propertyCount=
                {allProperty.filter(
                  (list) => list.agent === agents._id
                ).length}
              />
            ))}
          </Section.Content>
        </Section.InnerContainer>
      </Section>
    );
  }
};

export default FeaturedAgentsContainer;
