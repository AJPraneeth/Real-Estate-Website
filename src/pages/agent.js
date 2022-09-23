import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";



import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { Section, Agent } from "../components";

import {
  HeaderContainer,
  ListingItemContainer,
  ContactAgentContainer,
  PropertyRelatedContainer,
  FooterContainer,
} from "../containers";

const Agentt = () => {
  const { id } = useParams();

  const [singleAgent, setsingleAgent] = useState();
  // const [agentId, setAgentId] = useState();
  const [property, setProperty] = useState();
  const [featuredProperties, setFeaturedProperties] = useState();
  const [category, setCategory] = useState();

  const [categoryName, setCategoryName] = useState("All");
  const [categoryCount, setCategoryCount] = useState(0);
  const [selecteProperty, setSelectProperty] = useState(false);
  const [categoryNameProperty, setCategoryNameProperty] = useState();
  const[categoryNameCount,setCategoryNameCount]=useState();


  useEffect(() => {
    getProperty(id);
    getAllAgents(id);
  }, [id]);

  const getAllAgents = async (id) => {
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
        (agent) => agent._id === id
      );

      setsingleAgent(filterAgent);
      // setAgentId(filterAgent[0]._id);
    } catch (error) {
      console.log(error);
    }
  };

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

      const Property = await data.listing.filter((list) => list.agent === id);

      const featuredAgent = data.listing.filter(
        (listing) => listing.featured === true
      );
      const featuredProperty = featuredAgent.slice(0, 6);

      const categories = await Object.entries(
        Property.map((listings) => listings.category).reduce(
          (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
          {}
        )
      );

      setProperty(Property);
      setFeaturedProperties(featuredProperty);
      setCategory(categories);
      setCategoryCount(Property.length);
    } catch (error) {
      console.log(error);
    }
  };

  if (!property || !featuredProperties || !singleAgent || !category) {
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
            <Section.Header>
              <Section.Title>Agent Details</Section.Title>
              <Section.Text>{singleAgent[0].Name}</Section.Text>
            </Section.Header>
            <Agent.Content>
              <Agent.Left>
                <Agent.Info>
                  <Agent.InfoTop>
                    <Agent.TopLeft>
                      <Agent.Image src={singleAgent[0].image} />
                    </Agent.TopLeft>
                    <Agent.TopRight>
                      <Agent.Title>{singleAgent[0].Name}</Agent.Title>
                      <Agent.Text>Sales Agent</Agent.Text>
                      <Agent.List>
                        <Agent.ListItem>
                          <Agent.Icon name="fas fa-phone-alt" />
                          <Agent.Text>{singleAgent[0].phone}</Agent.Text>
                        </Agent.ListItem>

                        {/* check */}
                        <Agent.ListItem>
                          <Agent.Icon name="fab fa-whatsapp" />
                          <Agent.Text>{singleAgent[0].phone}</Agent.Text>
                        </Agent.ListItem>

                        <Agent.ListItem>
                          <Agent.Icon name="far fa-envelope" />
                          <Agent.Text>{singleAgent[0].email}</Agent.Text>
                        </Agent.ListItem>
                      </Agent.List>
                      <Agent.Social>
                        <Agent.List>
                          <Agent.ListItem>
                            {" "}
                            <Agent.ExternalAnchor to={singleAgent[0].facebook}>
                              <Agent.Icon name="fab fa-facebook-f" />
                            </Agent.ExternalAnchor>
                          </Agent.ListItem>
                          <Agent.ListItem>
                            <Agent.ExternalAnchor to={singleAgent[0].twitter}>
                              <Agent.Icon name="fab fa-twitter" />
                            </Agent.ExternalAnchor>
                          </Agent.ListItem>
                          <Agent.ListItem>
                            <Agent.ExternalAnchor to={singleAgent[0].linkedin}>
                              <Agent.Icon name="fab fa-linkedin" />
                            </Agent.ExternalAnchor>
                          </Agent.ListItem>
                          <Agent.ListItem>
                            <Agent.ExternalAnchor to={singleAgent[0].instagram}>
                              <Agent.Icon name="fab fa-instagram" />
                            </Agent.ExternalAnchor>
                          </Agent.ListItem>
                        </Agent.List>
                      </Agent.Social>
                    </Agent.TopRight>
                  </Agent.InfoTop>
                  <Agent.InfoBottom>
                    <Agent.Title>About Me</Agent.Title>
                    <Agent.About>
                      <Agent.Text>{singleAgent[0].about}</Agent.Text>
                    </Agent.About>
                  </Agent.InfoBottom>
                </Agent.Info>

                <Agent.Listing>
                  <Agent.ListingHeader>
                    <Agent.Title>My Listing</Agent.Title>
                    <CategoryBtns
                      categories={category}
                      count={categoryCount}
                      setCategoryName={setCategoryName}
                      properties={property}
                      agent={singleAgent[0]}
                      setProperties={setProperty}
                      setCategoryCount={setCategoryCount}

                      selecteProperty={selecteProperty}
                      setSelectProperty={setSelectProperty}
                      setCategoryNameProperty={setCategoryNameProperty}
                      setCategoryNameCount={setCategoryNameCount}
                    />
                  </Agent.ListingHeader>
                  
                  {!selecteProperty ? (
                    <>
                    <Agent.Title special="true">{`${categoryName} (${categoryCount})`}</Agent.Title>
                    <Agent.ListingContent>
                      {property.map((featured) => (
                        <ListingItemContainer
                          key={singleAgent[0]._id}
                          featured={featured}
                          width="49%"
                        />
                      ))}
                    </Agent.ListingContent>
                    </>
                  ) : (
                    <>
                    <Agent.Title special="true">{`${categoryName} (${categoryNameCount})`}</Agent.Title>
                    <Agent.ListingContent>
                      {categoryNameProperty.map((featured) => (
                        <ListingItemContainer
                          key={singleAgent[0]._id}
                          featured={featured}
                          width="49%"
                        />
                      ))}
                    </Agent.ListingContent>
                    </>
                  )}
                </Agent.Listing>
              </Agent.Left>
              <Agent.Right>
                <ContactAgentContainer property={singleAgent[0]} />
                <PropertyRelatedContainer featured={featuredProperties} />
              </Agent.Right>
            </Agent.Content>
          </Section.InnerContainer>
        </Section>
        <FooterContainer />
      </>
    );
  }
};

const CategoryBtns = ({
  categories,
  count,
  setCategoryName,
  setCategoryCount,
  properties,
  setProperties,
  agent,

  selecteProperty,
  setSelectProperty,
  setCategoryNameProperty,
  setCategoryNameCount,
  
}) => {
  const handleAll = (count) => {
    setCategoryCount(count);
    setCategoryName("All");
    setProperties(properties);
    setSelectProperty(false);
  };

  const handleCategories = (name, count) => {
    const filteredProperties = properties.filter(
      (property) => property.category === name
    );

    setCategoryName(name);

    setCategoryNameCount(count);

    setCategoryNameProperty(filteredProperties);
    setSelectProperty(true);
  };

  console.log(categories, "a", count, "Ss", properties);
  if (!categories || !count || !properties) {
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
      <Agent.Category>
        <Agent.Button onClick={() => handleAll(count)}>All</Agent.Button>
        {categories.map((category) => (
          <Agent.Button
            key={agent._id}
            onClick={() => handleCategories(category[0], category[1])}
          >
            {category[0]}
          </Agent.Button>
        ))}
      </Agent.Category>
    );
  }
};

export default Agentt;
