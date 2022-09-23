const express = require("express");
const message = express.Router();
const cors = require("cors");
const Message = require("../Models/messageDB");
message.use(cors());

message.get("/getAllMessage", async (req, res) => {
  const message = await Message.find({});

  try {
    if (!message) {
      return res
        .status(400)
        .json({ message: "There are not any Massages"});
    } else {
      return res.status(200).json({
        message: "Here your messages",
        messageDetails: message,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error: " + error });
  }
});

message.post("/messageRead", async (req, res) => {
  const MassageID = req.body.massageId;

  try {
    Message.updateOne({ _id: MassageID }, { read: true })

      .then((Message) => {
        res.status(200).json({ message: "This Message you read" });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Read Message Error",
          Error: err,
        });
      });
  } catch (error) {
    res.send("Error " + error);
  }
});

message.post("/messageDelete", async (req, res) => {
    const MassageID = req.body.massageId;
  
    try {
      Message.findOneAndDelete({ _id: MassageID})
      .then((err, docs) => {
        
        if (!err) {
          return res
            .status(400)
            .json({ message: "This Message cant delete", error: err });
        } else {
          return res
            .status(200)
            .json({ message: "Message Deleted", delete: docs });
        }
      });
  
    } catch (error) {
      res.send("Error " + error);
    }
  });

message.post("/sendMessage", async (req, res) => {
  const messageDetails = {
    clientName: req.body.name,
    clientEmail: req.body.email,
    clientPhone: req.body.phone,
    clientTitle: req.body.title,
    clientMessage: req.body.message,
    to:req.body.to
  };

  if (
    !messageDetails.clientName ||
    !messageDetails.clientEmail ||
    !messageDetails.clientPhone ||
    !messageDetails.clientTitle ||
    !messageDetails.clientMessage
  ) {
    return res
      .status(400)
      .json({ message: "You must complete required fields " });
  }

  try {
    Message.create(messageDetails)
      .then((message) => {
        res.status(200).json({ message: "Your message was sent" });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({
            message: "Something wrong. We cant send your message. Try again",
            Error: err,
          });
      });
  } catch (error) {
    res.send("Error " + error);
  }

});


module.exports = message;