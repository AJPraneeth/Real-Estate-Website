const express = require("express");
const listing = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

const Listing = require("../Models/ListingDB");

listing.use(cors());

listing.get("/all-listing", async (req, res) => {
  
  const listing = await Listing.find({});

  try {
    if (!listing) {
      return res.status(400).json({ message: "There are not any Properties" });
    } else {



      
      console.log("Alllisting hi");

    
      return res.status(200).json({
        message: "You can access to Properties",
        listing: listing,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error: " + error });
  }
});

listing.post("/add-listing", (req, res) => {
  const listingData = {
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    listedIn: req.body.listedIn,
    description: req.body.description,

    no: req.body.no,
    address: req.body.address,
    province: req.body.province,
    city: req.body.city,
    street: req.body.street,

      image1: req.body.image.image1,
      image2: req.body.image.image2,
      image3: req.body.image.image3,
      image4: req.body.image.image4,

    bedroom: req.body.bedrooms,
    bathroom: req.body.bathrooms,
    kitchen: req.body.kitchen,
    garage: req.body.garage,
    floor: req.body.floors,
    amenities: req.body.amenities,

    agent: req.body.agent,
  };

  console.log(listingData, "Hiii");

  if (
    !listingData.title ||
    !listingData.price ||
    !listingData.category ||
    !listingData.listedIn ||
    !listingData.description ||
    !listingData.no ||
    !listingData.address ||
    !listingData.province ||
    !listingData.city ||
 
    !listingData.image1 ||
    !listingData.image2 ||
    !listingData.image3 ||
    !listingData.image4 ||
  
    !listingData.bedroom ||
    !listingData.bathroom ||
    !listingData.kitchen ||
    !listingData.garage ||
    !listingData.floor ||
    !listingData.amenities ||
    !listingData.agent
  ) {
    return res
      .status(400)
      .json({ message: "You must complete required fields " });
  }

  try {
    Listing.create(listingData)
      .then((LISTING) => {
        res.status(200).json({ message: "Your are successfully Add property" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({
            message: "You cant add this property now, Try again",
            Error: err,
          });
      });
  } catch (error) {
    res.send("Error " + error);
  }
});

listing.post("/listDelete", (req, res) => {
  

  try {
    Listing.findOneAndDelete({ _id: req.body.id }).then((err, docs) => {
        
      if (!err) {
        return res
          .status(400)
          .json({ message: "This Property cant delete", error: err });
      } else {
        return res
          .status(200)
          .json({ message: "Property Deleted", delete: docs });
      }
    });
  } catch (error) {
    res.send("Error " + error);
  }
});



listing.post("/update-listing", (req, res) => {
    const updateListingData = {
        
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      listedIn: req.body.listedIn,
      description: req.body.description,
  
      no: req.body.no,
      address: req.body.address,
      province: req.body.province,
      city: req.body.city,
      street: req.body.street,
      
      image1: req.body.image.image1,
      image2: req.body.image.image2,
      image3: req.body.image.image3,
      image4: req.body.image.image4,
  
      bedroom: req.body.bedrooms,
      bathroom: req.body.bathrooms,
      kitchen: req.body.kitchen,
      garage: req.body.garage,
      floor: req.body.floors,
      amenities: req.body.amenities,
  
      agent: req.body.agent,
    };
  
  

    if (!updateListingData.title) {
      updateListingData.title=req.body.prevData[0].title
    }
  
    if (!updateListingData.price) {
      updateListingData.price=req.body.prevData[0].price
    }
    if (!updateListingData.category) {
      updateListingData.category=req.body.prevData[0].category
    }
    if (!updateListingData.listedIn) {
      updateListingData.listedIn=req.body.prevData[0].listedIn
    }
    if (!updateListingData.no) {
      updateListingData.no=req.body.prevData[0].no
    }
    if (!updateListingData.address) {
      updateListingData.address=req.body.prevData[0].address
    }
    if (!updateListingData.province) {
      updateListingData.province=req.body.prevData[0].province
    }
     if (!updateListingData.city) {
      updateListingData.city=req.body.prevData[0].city
    }
    if (!updateListingData.street) {
      updateListingData.street=req.body.prevData[0].street
    }
    if (!updateListingData.image1) {
      updateListingData.image1=req.body.prevData[0].image1
    }
    if (!updateListingData.image2) {
      updateListingData.image2=req.body.prevData[0].image2
    }
    if (!updateListingData.image3) {
      updateListingData.image3=req.body.prevData[0].image3
    }
    if (!updateListingData.image4) {
      updateListingData.image4=req.body.prevData[0].image4
    }
    if (!updateListingData.bedroom) {
      updateListingData.bedroom=req.body.prevData[0].bedroom
    }
    if (!updateListingData.bathroom) {
      updateListingData.bathroom=req.body.prevData[0].bathroom
    }
    if (!updateListingData.kitchen) {
      updateListingData.kitchen=req.body.prevData[0].kitchen
    }
    if (!updateListingData.garage) {
      updateListingData.garage=req.body.prevData[0].garage
    }
    if (!updateListingData.floor) {
      updateListingData.floor=req.body.prevData[0].floor
    }
    if (!updateListingData.amenities) {
      updateListingData.amenities=req.body.prevData[0].amenities
    }
    if (!updateListingData.agent) {
      updateListingData.agent=req.body.prevData[0].agent
    }
  

    try {
        Listing.updateOne(
            { _id: req.body.id},
            { 
              title:updateListingData.title,
              price:updateListingData.price, 
              category:updateListingData.category ,
              listedIn:updateListingData.listedIn, 
              description:updateListingData.description ,
              no:updateListingData.no ,
              address:updateListingData.address ,
              province:updateListingData.province ,
              city:updateListingData.city ,
              street:updateListingData.street ,
              image1:updateListingData.image1,
              image2:updateListingData.image2,
              image3:updateListingData.image3,
              image4:updateListingData.image4,
              bedroom:updateListingData.bedroom ,
              bathroom:updateListingData.bathroom ,
              kitchen:updateListingData.kitchen ,
              garage:updateListingData.garage ,
              floor:updateListingData.floor ,
              amenities:updateListingData.amenities ,
              agent:updateListingData.agent }
          )
        .then((LISTING) => {
          res.status(200).json({ message: "Yor are successfully Updated this property" });
        })
        .catch((err) => {
          res
            .status(400)
            .json({
              message: "You cant update this property now, Try again",
              Error: err,
            });
        });
    } catch (error) {
      res.send("Error " + error);
    }
  });






module.exports = listing;
