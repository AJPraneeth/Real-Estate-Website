import React, { useEffect, useState } from "react";
import { Table, AdminListing } from "../components";


import {
  AdminListingHeader,
  PropertyData,
  PropertyHead,
} from "../partials/admin_listing_partial";

import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";


const AdminAllListingContainer = () => {
  const [selectId, setSelectId] = useState(null);
  const [allProperties, SetallProperties] = useState();
  const [searchProperty,setSearchProperty]=useState()




  useEffect(() => {
    
    getProperty();
  }, []);

  // ApI call

  const handleDeleteAction = async (id) => {

    console.log(id);

    const listId = {
      id: id,
    };

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/listDelete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listId),
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

      SetallProperties(data.listing);

      console.log(data.listing,"Hi");
    } catch (error) {
      console.log(error);
    }
  };
console.log(searchProperty,"Hi");
  if (!searchProperty)
  {

  if (!allProperties) {
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
      <AdminListing>
        <AdminListing.Top>
          <AdminListingHeader
            selectId={selectId}
            handleDeleteAction={handleDeleteAction}
            setSearchProperty={setSearchProperty}
          />
        </AdminListing.Top>
        <AdminListing.Content>
          <Table>
            <PropertyHead />
            <Table.Body>
              {allProperties.map((property) => (
                <PropertyData property={property} setSelectId={setSelectId} />
              ))}
            </Table.Body>
          </Table>
        </AdminListing.Content>
      </AdminListing>
    );
  }
}
else {

  return (
    <AdminListing>
      <AdminListing.Top>
        <AdminListingHeader
          selectId={selectId}
          handleDeleteAction={handleDeleteAction}
          setSearchProperty={setSearchProperty}
        />
      </AdminListing.Top>
      <AdminListing.Content>
        <Table>
          <PropertyHead />
          <Table.Body>
            {searchProperty.map((property) => (
              <PropertyData property={property} setSelectId={setSelectId} />
            ))}
          </Table.Body>
        </Table>
      </AdminListing.Content>
    </AdminListing>
  );
  
}
};

export default AdminAllListingContainer;
