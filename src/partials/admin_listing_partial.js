import React, { useState } from "react";

import { Table, AdminListing, Form } from "../components";

const PropertyHead = () => {
  return (
    <Table.Head>
      <Table.Row>
        <Table.Data>Title</Table.Data>
        <Table.Data>Price (Rs)</Table.Data>
        <Table.Data>Category</Table.Data>
        <Table.Data>Listed In</Table.Data>
        <Table.Data>City</Table.Data>
        <Table.Data>Province</Table.Data>
        <Table.Data>Action</Table.Data>
      </Table.Row>
    </Table.Head>
  );
};
const PropertyData = ({ property, setSelectId }) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = (id) => {
    setSelected((prevState) => !prevState);
    setSelectId(id);
  };

  return (
    <Table.Row>
      <Table.Data>{property.title}</Table.Data>
      <Table.Data>{property.price}</Table.Data>
      <Table.Data>{property.category}</Table.Data>
      <Table.Data>{property.listedIn}</Table.Data>
      <Table.Data>{property.city}</Table.Data>
      <Table.Data>{property.province}</Table.Data>
      <Table.Data>
        <Table.Button onClick={() => handleSelect(property._id)}>
          {selected ? "Selected" : "Select"}
        </Table.Button>
      </Table.Data>
    </Table.Row>
  );
};

const AdminListingHeader = ({ selectId, handleDeleteAction,setSearchProperty }) => {
  


const getSearchDetails =async(searchData)=>{

  const searchDetails ={
    searchData:searchData
   }
  
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/singleSearch`, {
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
      setSearchProperty(data.details)
    }
  } catch (error) {
    console.log(error);
  }

}



  return (
    <AdminListing.Header>
      <Form>
      <Form.Input type="text" placeholder="Search" onChange={e=>getSearchDetails(e.target.value)}/>

        {/* <div class="row">
        <div class="col">
        <Form.Input type="text" placeholder="Search" onChange={e=>setSearchData(e.target.value)}/>
        </div>
        <div class="col">
        <Form.Button type ="button" value="Search" onClick={getSearchDetails}/>
        </div>
        </div> */}
      </Form>
      <AdminListing.Action>
        <AdminListing.Button
          onClick={() => handleDeleteAction(selectId)}
          bg="var(--bs-danger)">
          Delete
        </AdminListing.Button>
        <AdminListing.Button bg="var(--bs-blue)">
          
          <AdminListing.Anchor to={selectId && `/edit-listing/${selectId}`}>
            Edit
          </AdminListing.Anchor>
        </AdminListing.Button>
        <AdminListing.Button bg="var(--bs-blue)">
          <AdminListing.Anchor to={selectId && `/property/${selectId}`}>
            View
          </AdminListing.Anchor>
        </AdminListing.Button>
      </AdminListing.Action>
    </AdminListing.Header>
  );
};

export { AdminListingHeader, PropertyHead, PropertyData };
