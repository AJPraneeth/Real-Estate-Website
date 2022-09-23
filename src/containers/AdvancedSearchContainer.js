import React, {  useState } from "react";

import { FormWrapper, Form } from "../components";

import { priceFormat } from "../helpers/helper_functions";

const AdvancedSearchContainer = ({
  category,
  listedIn,
  province,
  bedroom,
  bathroom,
  floor,
  price,
  setSearchedProperties,
  
}) => {
  

  const maxPrice = Math.max.apply(null, price),
    minPrice = Math.min.apply(null, price);

  const maxBedroom = Math.max.apply(null, bedroom);
  const maxBathroom = Math.max.apply(null, bathroom);

  const [load, setLoad] = useState(false);
  const [priceRange, setPriceRange] = useState(0);
  const [selectedCategory, setselectedCategory] = useState();
  const [selectedListedIn, setselectedListedIn] = useState();
  const [selectedProvince, setselectedProvince] = useState();
  const [selectedBedroom, setselectedBedroom] = useState();
  const [selectedBathroom, setselectedBathroom] = useState();
  const [selectedFloor, setselectedFloor] = useState();

  const [propety,setProperty]=useState()

  const searchDetails = {
    category: selectedCategory,
    listedIn: selectedListedIn,
    province: selectedProvince,
    bedroomMin: selectedBedroom,
    bedroomMax: maxBedroom,
    bathroomMin: selectedBathroom,
    bathroomMax: maxBathroom,
    floor: selectedFloor,
    priceMax: parseInt(priceRange),
    priceMin: minPrice,
  };

  

  const getSearchProperty = async () => {
          setLoad(true) 
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchDetails),
      });

      const data = await res.json();
      console.log(data);
      if (res.status === 400) {
        window.alert(data.message);
        console.log(data.message);
        setLoad(false)
      } else {
        setLoad(false)
        //  window.alert(data.message)
        console.log(data.message);
        setProperty(data.properties)
        setSearchedProperties(data.properties);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetSearch=()=>{window.location.reload()}
  console.log(searchDetails);
  console.log(propety);
  return (
    <FormWrapper>
      <FormWrapper.Header>
        <FormWrapper.Title>Advanced Search</FormWrapper.Title>
      </FormWrapper.Header>
      <FormWrapper.Content>
        <Form>
          <Form.FormGroup>
            <Form.Select onChange={(e) => setselectedListedIn(e.target.value)}>
              <Form.Option defaultValue>Types</Form.Option>
              {listedIn.map((type) => (
                <Form.Option key={type}>{type}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select onChange={(e) => setselectedProvince(e.target.value)}>
              <Form.Option defaultValue>Province</Form.Option>
              {province.map((province) => (
                <Form.Option key={province}>{province}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select onChange={(e) => setselectedCategory(e.target.value)}>
              <Form.Option defaultValue>Categories</Form.Option>
              {category.map((category) => (
                <Form.Option key={category}>{category}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select
              onChange={(e) => setselectedBedroom(parseInt(e.target.value))}
            >
              <Form.Option defaultValue>Bed Rooms</Form.Option>
              {bedroom.map((room) => (
                <Form.Option key={Math.random(room)}>{room}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select
              onChange={(e) => setselectedBathroom(parseInt(e.target.value))}
            >
              <Form.Option defaultValue>Bath Rooms</Form.Option>
              {bathroom.map((room) => (
                <Form.Option key={Math.random(room)}>{room}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Select
              onChange={(e) => setselectedFloor(parseInt(e.target.value))}
            >
              <Form.Option defaultValue>Floors</Form.Option>
              {floor.map((room) => (
                <Form.Option key={Math.random(room)}>{room}</Form.Option>
              ))}
            </Form.Select>
          </Form.FormGroup>
          <Form.FormGroup>
            <Form.Span>
              {" "}
              Price range: Rs:{priceFormat(minPrice)} to Rs:{" "}
              {priceFormat(+priceRange)}
            </Form.Span>
            <Form.RangeInput
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              step="10000"
              onChange={({ target: { value } }) => setPriceRange(value)}
            />
          </Form.FormGroup>
          {!load?(
                 <div class="container text-center">
                 <div class="row">
                   <div class="col-lg-6 col-md-12 col-sm-12">
                     <Form.FormGroup>
                       <Form.Button
                         type="button"
                         value="Search"
                         onClick={getSearchProperty}
                       />
                     </Form.FormGroup>
                   </div>
                   <div class="col-lg-6 col-md-12 col-sm-12">
                     <Form.FormGroup>
                       <Form.Button
                         type="button"
                         value="Reset"
                         onClick={resetSearch}
                       />
                     </Form.FormGroup>
                   </div>
                 </div>
               </div>
          ):(
            <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  Searching...
</button>
          )}
     
        </Form>
      </FormWrapper.Content>
    </FormWrapper>
  );
};

export default AdvancedSearchContainer;
