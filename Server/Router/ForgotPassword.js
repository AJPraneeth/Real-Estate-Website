const { User, validate } = require("../Models/UserDb");
const Token = require("../Models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const generator = require("generate-password");
const bodyParser = require("body-parser");
const cors = require("cors");

router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post("/forgot-password", async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json({ message: "user with given email doesn't exist" });
    } else {
      const newPassword = generator.generate({
        length: 10,
        numbers: true,
      });
       console.log(newPassword)
      text = ` <html>Your new Password is<h1>${newPassword}</h1> </html> `;
      await sendEmail(user.email, "Password reset", text);

      console.log(newPassword, "Your new password sent to your email account");

      await bcrypt.hash(newPassword, 10, (err, hash) => {
        user.password = hash;
        user.confirmPassword = user.password;

        User.updateOne(
          { _id: user._id },
          { password: user.password, confirmPassword: user.confirmPassword }
        )
          .then((users) => {
            res.status(200).json({ message: "Password reset" });
            text = ` <html><h1>Your New Password Updated</h1> </html> ` ;
            sendEmail(user.email, "Password reset", text);
            
            
          })
          .catch((err) => {
            res.status(400).json({ message: "password update error" });
          });
      });
    }
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

router.post("/changePassword", async (req, res) => {
  console.log("aaa");

  
  try {
    
    const user = await User.findOne({ email: req.body.email });


    if (!user) {
      return res
        .status(400)
        .json({ message: "user with given email doesn't exist" });
    } else {
      
      if (!req.body.password ||!req.body.confirmPassword) {   
        return res.status(400).json({ message: "Please filled the field property"});
      }

      if (req.body.password !== req.body.confirmPassword) {   
        return res.status(400).json({ message: "Password dose not match" });
      } else {
       
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          user.password = hash;
          user.confirmPassword = user.password;

          User.updateOne(
            { _id: user._id },
            { password: user.password, confirmPassword: user.confirmPassword }
          )

            .then((users) => {
              res.status(200).json({ message: "New Password reset successfully completed" });
              text = ` <html><h1>Your New Password Updated</h1> </html> `  ;
              sendEmail(user.email, "Password reset", text);
            })
            .catch((err) => {
              res.status(400).json({ message: "Password update error" });
            });
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error });

    console.log(error, "rest psw");
  }
});

module.exports = router;
