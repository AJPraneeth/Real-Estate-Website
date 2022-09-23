const express = require("express");
const Email = express.Router();
const cors = require("cors");
const sendEmail = require("../utils/sendEmail");

Email.use(cors());

Email.post("/sendEmailAdmin", async (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
 

  if (!email || !subject || !message ) {
    res.status(400).json({ message: "You need to fill required filed" });
  } else {
    text = ( `<html>
      <div> 
        <h3>Reply of Your Message :</h3> <br/> <p>  ${message} </p>
      </div>
      </html>`
    );

   const SendEmail= await sendEmail(email, subject, text);
   console.log(SendEmail,text);
  }
});


module.exports=Email