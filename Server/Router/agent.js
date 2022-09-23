const express = require("express");
const agent = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");

const Agent = require("../Models/agentDB");

agent.use(cors());

agent.use(bodyParser.json());
agent.use(bodyParser.urlencoded({ extended: false }));

// console.log("agent");

agent.get("/all-agents", async (req, res) => {
  const agent = await Agent.find({});

  try {
    if (!agent) {
      return res.status(400).json({ message: "There are not any agents" });
    } else {
      return res.status(200).json({
        message: "You can access to agents details",
        agents: agent,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error: " + error });
  }
});

agent.post("/add-agent", async (req, res) => {
  const agentDetails = {
    Name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    about: req.body.description,

    address: req.body.address,
    City: req.body.city,
    province: req.body.province,
    image: req.body.image,

    facebook: req.body.faceBook,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
    linkedin: req.body.linkedin,
    featured: req.body.featured,
  };
  console.log(agentDetails);

  if (
    !agentDetails.Name ||
    !agentDetails.email ||
    !agentDetails.phone ||
    !agentDetails.about ||
    !agentDetails.address ||
    !agentDetails.City ||
    !agentDetails.province ||
    !agentDetails.image ||
    !agentDetails.featured
  ) {
    return res
      .status(400)
      .json({ message: "You must complete required fields " });
  }

  try {
    Agent.create(agentDetails)
      .then((agent) => {
        res.status(200).json({ message: "Your are successfully Add Agent" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "You cant add this Agent now, Try again",
          Error: err,
        });
      });
  } catch (error) {
    res.send("Error " + error);
  }
});

agent.post("/Update-Agent", async (req, res) => {
  const agentDetails = {
    Name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    about: req.body.description,

    address: req.body.address,
    City: req.body.city,
    province: req.body.province,
    image: req.body.image,

    facebook: req.body.faceBook,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
    linkedin: req.body.linkedin,
    featured: req.body.featured,
  };

  console.log(agentDetails.facebook);

  if ( !agentDetails.Name) {
    agentDetails.Name=req.body.prevData[0].Name
  }

  if ( !agentDetails.email) {
    agentDetails.email=req.body.prevData[0].email
  }

  if ( !agentDetails.phone) {
    agentDetails.phone=req.body.prevData[0].phone
  }

  if ( !agentDetails.about) {
    agentDetails.about=req.body.prevData[0].about
  }
  if ( !agentDetails.address) {
    agentDetails.address=req.body.prevData[0].address
  }

  if ( !agentDetails.City) {
    agentDetails.City=req.body.prevData[0].City
  }
  if ( !agentDetails.province) {
    agentDetails.province=req.body.prevData[0].province
  }

  if ( !agentDetails.image) {
    agentDetails.image=req.body.prevData[0].image
  }

  
  if ( !agentDetails.facebook) {
    agentDetails.facebook=req.body.prevData[0].facebook
  }
  if ( !agentDetails.instagram) {
    agentDetails.instagram=req.body.prevData[0].instagram
  }

  if ( !agentDetails.twitter) {
    agentDetails.twitter=req.body.prevData[0].twitter
  }
  if ( !agentDetails.linkedin) {
    agentDetails.linkedin=req.body.prevData[0].linkedin
  }

  if ( !agentDetails.featured) {
    agentDetails.featured=req.body.prevData[0].featured
  }

  try {
    const update = Agent.updateOne(
      { _id: req.body.id },
      {   
        Name: agentDetails.Name,
        email: agentDetails.email,
        phone: agentDetails.phone,
        about: agentDetails.about,
        address: agentDetails.address,
        City: agentDetails.City,
        province: agentDetails.province,
        image: agentDetails.image,
        facebook: agentDetails.facebook,
        twitter: agentDetails.twitter,
        linkedin: agentDetails.linkedin,
        featured: agentDetails.featured,
      }
    )
      .then((agent) => {
        res.status(200).json({ message: "Your are successfully Updated" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          message: "You cant update this Agent now, Try again",
          Error: err,
        });
      });
    console.log(update);
  } catch (error) {
    res.send("Error " + error);
  }
});


agent.post("/delete-Agent",async (req,res)=>{

  try {
    Agent.findOneAndDelete({ _id: req.body.id }).then((err, docs) => {
        
      if (!err) {
        return res
          .status(400)
          .json({ message: "This Agent cant delete", error: err });
      } else {
        return res
          .status(200)
          .json({ message: " Deleted", delete: docs });
      }
    });
  } catch (error) {
    res.send("Error " + error);
  }
})

module.exports = agent;
