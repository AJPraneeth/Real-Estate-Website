import React, { useEffect, useState } from "react";
import {
  HeaderContainer,
  DashboardContainer,
  FooterContainer,
} from "../containers";
import { Section, AdminAgents, Table, Form } from "../components";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const AdminAgentsList = () => {
  const [allAgents, setAllAgents] = useState();
  const [allProperty, setAllProperty] = useState();
  const [searchAgent,setSearchAgent]=useState()

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

 
  const agentDelete = async (id) => {

  console.log(id);

    const AgentId = {
      id: id,
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/delete-Agent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(AgentId),
        }
      );
      const data = await res.json();
      if (res.status === 400) {
        window.alert(data.message);
        console.log(data.message);
      } else {
        window.alert(data.message);
        console.log(data.message);

        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
const getSearchDetails =async(searchData)=>{

  const searchDetails ={
    searchData:searchData
   }
  
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/singleSearchAgent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchDetails),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 400) {
      // window.alert(data.message);
      console.log(data.message);
    } else {
      //  window.alert(data.message)
      console.log(data.message);
      setSearchAgent(data.details)
    }
  } catch (error) {
    console.log(error);
  }

}

if (!searchAgent) {
  
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
            <DashboardContainer title="All Agents">
              <Form.FormSearch>
              <div class="row">
                <div  class="col-4">
              <Form>
                <Form.Input
                  type="text"
                  placeholder="Search"
                   onChange={e=>getSearchDetails(e.target.value)}
                />
              </Form>
              </div>
              </div> 
              </Form.FormSearch>
              <AdminAgents>
                <AdminAgents.Content>
                  <Table>
                    <Table.Head>
                      <Table.Row>
                        <Table.Data>Name</Table.Data>
                        <Table.Data>Email</Table.Data>
                        <Table.Data>Phone</Table.Data>
                        <Table.Data>City</Table.Data>
                        <Table.Data>Province</Table.Data>
                        <Table.Data>Count</Table.Data>
                        <Table.Data>Action</Table.Data>
                        <Table.Data>Edit</Table.Data>
                        <Table.Data>Delete</Table.Data>
                      </Table.Row>
                    </Table.Head>
                    <Table.Body>
                      {allAgents.map((agent) => (
                        <Table.Row>
                          <Table.Data>{agent.Name}</Table.Data>
                          <Table.Data>{agent.email}</Table.Data>
                          <Table.Data>{agent.phone}</Table.Data>
                          <Table.Data>{agent.City}</Table.Data>
                          <Table.Data>{agent.province}</Table.Data>
                          <Table.Data>
                            {
                              allProperty.filter(
                                (list) => list.agent === agent._id
                              ).length
                            }
                          </Table.Data>
                          <Table.Data>
                            <Table.Anchor to={`agent/${agent._id}`}>
                              View
                            </Table.Anchor>
                          </Table.Data>
                          <Table.Data>
                            <Table.Anchor to={`edit-agent/${agent._id}`}>
                              Edit
                            </Table.Anchor>
                          </Table.Data>
                          <Table.Data>
                            <Table.ButtonRed onClick={()=>agentDelete(agent._id)}>Delete</Table.ButtonRed>
                          </Table.Data>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </AdminAgents.Content>
              </AdminAgents>
            </DashboardContainer>
          </Section.InnerContainer>
        </Section>
        <FooterContainer />
      </>
    );
  }


} else {

  return (
    <>
      <HeaderContainer bg={false} />
      <Section bgColor="--bs-fade-info">
        <Section.InnerContainer>
          <DashboardContainer title="All Agents">
            <Form.FormSearch>
            <div class="row">
              <div  class="col-4">
            <Form>
              <Form.Input
                type="text"
                placeholder="Search"
                 onChange={e=>getSearchDetails(e.target.value)}
              />
            </Form>
            </div>
            </div> 
            </Form.FormSearch>
            <AdminAgents>
              <AdminAgents.Content>
                <Table>
                  <Table.Head>
                    <Table.Row>
                      <Table.Data>Name</Table.Data>
                      <Table.Data>Email</Table.Data>
                      <Table.Data>Phone</Table.Data>
                      <Table.Data>City</Table.Data>
                      <Table.Data>Province</Table.Data>
                      <Table.Data>Count</Table.Data>
                      <Table.Data>Action</Table.Data>
                      <Table.Data>Edit</Table.Data>
                      <Table.Data>Delete</Table.Data>
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {searchAgent.map((agent) => (
                      <Table.Row>
                        <Table.Data>{agent.Name}</Table.Data>
                        <Table.Data>{agent.email}</Table.Data>
                        <Table.Data>{agent.phone}</Table.Data>
                        <Table.Data>{agent.City}</Table.Data>
                        <Table.Data>{agent.province}</Table.Data>
                        <Table.Data>
                          {
                            allProperty.filter(
                              (list) => list.agent === agent._id
                            ).length
                          }
                        </Table.Data>
                        <Table.Data>
                          <Table.Anchor to={`agent/${agent._id}`}>
                            View
                          </Table.Anchor>
                        </Table.Data>
                        <Table.Data>
                          <Table.Anchor to={`edit-agent/${agent._id}`}>
                            Edit
                          </Table.Anchor>
                        </Table.Data>
                        <Table.Data>
                          <Table.ButtonRed onClick={()=>agentDelete(agent._id)}>Delete</Table.ButtonRed>
                        </Table.Data>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </AdminAgents.Content>
            </AdminAgents>
          </DashboardContainer>
        </Section.InnerContainer>
      </Section>
      <FooterContainer />
    </>
  );
  
  
}

  
};

export default AdminAgentsList;
