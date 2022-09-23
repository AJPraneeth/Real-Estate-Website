const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const { User, validate } = require("../Models/UserDb");
const verifyJWT = require("../Middleware/verifyJWT");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.use(bodyParser.json());
users.use(bodyParser.urlencoded({ extended: false }));

users.post("/signup", async (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
  };

  console.log(userData);

  if (
    !userData.name ||
    !userData.email ||
    !userData.password ||
    !userData.confirmPassword ||
    !userData.phone ||
    !userData.address ||
    !userData.city ||
    !userData.province
  ) {
    return res
      .status(422)
      .json({ message: "Please filled the field property" });
  }

  if (userData.password != userData.confirmPassword) {
    return res.status(422).json({ message: "Password is not matching" });
  }

  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(422).json({ message: "User already registered" });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        userData.password = hash;
        userData.confirmPassword = userData.password;

        User.create(userData)
          .then((user) => {
            res
              .status(200)
              .json({ message: "Yor are successfully registered" });
          })
          .catch((err) => {
            res.send("Error " + err);
          });
      });
    }
  } catch (error) {
    res.send("Error " + error);
  }
});

users.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })

    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          };

          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
              expiresIn: 86400,
            },
            (err, token) => {
              if (err) {
                res.status(404).json({ message: err });
              }
              if (user.isAdmin) {
                isAdmin = true;
              } else {
                isAdmin = false;
              }
              res.status(200).json({
                message: "Your loging process success",
                token: token,
                admin: isAdmin,
                email: req.body.email,
              });
            }
          );
        } else {
          res.status(404).json({ message: "Invalid Username or Password" });
        }
      } else {
        res.status(404).json({ message: "Invalid Username or Password" });
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
});

users.get("/auth", verifyJWT, (req, res) => {
  res.status(200).json({
    isLoggedIn: true,
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
});

users.post("/getUserDetails", async (req, res) => {
  const profile = await User.findOne({ email: req.body.email });

  try {
    if (!profile) {
      return res
        .status(400)
        .json({ message: "user with given email doesn't exist" });
    } else {
      return res.status(200).json({
        message: "You can access to user details",
        id: profile._id,
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        province: profile.province,
        about: profile.about,
        image: profile.image,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error: " + error });
  }
});

users.post("/updateUser", (req, res) => {

  const updateUserData = {
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    about: req.body.about,
    image: req.body.image,
  };

  if (
    !updateUserData.name ||
    !updateUserData.phone ||
    !updateUserData.address ||
    !updateUserData.city ||
    !updateUserData.province
  ) {
    return res
      .status(400)
      .json({ message: "You must complete required fields " });
  }

  try {
    User.updateOne(
      {email:req.body.email},{
        name: updateUserData.name,
        phone: updateUserData.phone,
        address: updateUserData.address,
        city: updateUserData.city,
        province: updateUserData.province,
        about: updateUserData.about,
        image: updateUserData.image,
      }
    )
    .then((User) => {
      res.status(200).json({ message: "Yor are successfully Updated Your Profile" });
    })
    .catch((err) => {
      res
        .status(400)
        .json({
          message: "You cant update Your Profile now, Try again",
          Error: err,
        });
    });

  } catch (error) {

    res.send("Error " + error);
  }
});

module.exports = users;
