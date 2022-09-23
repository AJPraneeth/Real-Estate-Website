const express = require("express");
const search = express.Router();
const cors = require("cors");

const Listing = require("../Models/ListingDB");
const Agent = require("../Models/agentDB");

search.use(cors());

search.post("/search", async (req, res) => {
  let filterCategory;
  let filterListedIn;
  let filterProvince;

  const category = req.body.category;
  const listedIn = req.body.listedIn;
  const province = req.body.province;
  const bedroomMin = req.body.bedroomMin;
  const bedroomMax = req.body.bedroomMax;
  const bathroomMin = req.body.bathroomMin;
  const bathroomMax = req.body.bathroomMax;
  const floor = req.body.floor;
  const priceMin = req.body.priceMin;
  const priceMax = req.body.priceMax;

  console.log(
    category,
    listedIn,
    province,
    bedroomMin,
    bedroomMax,
    floor,
    priceMin,
    priceMax
  );
  try {
    if (category !== undefined && category !== null) {
      filterCategory = {
        $regex: ".*" + category + ".*",
        $options: "i",
      };
    }

    if (listedIn !== undefined && listedIn !== null) {
      filterListedIn = {
        $regex: ".*" + listedIn + ".*",
        $options: "i",
      };
    }

    if (province !== undefined && province !== null) {
      filterProvince = {
        $regex: ".*" + province + ".*",
        $options: "i",
      };
    }

    const properties = await Listing.find({
      $or:[
      {category: filterCategory},
     { listedIn: filterListedIn},
     { province: filterProvince},
      {bedroom: { $gte: bedroomMin, $lte: bedroomMax }},
     { bathroom: { $gte: bathroomMin, $lte: bathroomMax }},
      {floor: floor},
      {price: { $gte: priceMin, $lte: priceMax }},
      ]
    });
    console.log(properties.length);
    if (properties.length === 0) {
      res.status(400).json({ message: "Not found any properties" });
    } else {
      res
        .status(200)
        .json({ message: "We found some properties", properties: properties });
    }
  } catch (error) {
    res.send(error);
  }
});

search.post("/singleSearch", async (req, res) => {
  let filterSearchData;

  const searchData = req.body.searchData;
  console.log(searchData);

  try {
    if (searchData !== undefined && searchData !== null) {
      filterSearchData = {
        $regex: ".*" + searchData + ".*",
        $options: "i",
      };
    }
    console.log(filterSearchData);
    const details = await Listing.find({
      $or: [
        
          {category: filterSearchData},
          {listedIn: filterSearchData},
          {title: filterSearchData},
         { address: filterSearchData},
          {province: filterSearchData},
          {city: filterSearchData},
        
      ],
    });

    // console.log(details);

    if (details.length === 0) {
      res.status(400).json({ message: "Not found any properties" });
    } else {
      res
        .status(200)
        .json({ message: "We found some properties", details: details });
    }
  } catch (error) {
    res.send(error);
  }
});

search.post("/singleSearchAgent", async (req, res) => {
  let filterSearchData;

  const searchData = req.body.searchData;
  console.log(searchData);

  try {
    if (searchData !== undefined && searchData !== null) {
      filterSearchData = {
        $regex: ".*" + searchData + ".*",
        $options: "i",
      };
    }
    console.log(filterSearchData);
    const details = await Agent.find({
      $or: [
        
          {Name: filterSearchData},
          {email: filterSearchData},
          {phone: filterSearchData},
         { address: filterSearchData},
          {province: filterSearchData},
          {City: filterSearchData},
        
      ],
    });

    // console.log(details);

    if (details.length === 0) {
      res.status(400).json({ message: "Not found any properties" });
    } else {
      res
        .status(200)
        .json({ message: "We found some properties", details: details });
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = search;
