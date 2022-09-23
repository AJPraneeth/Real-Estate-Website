const express=require('express');
const path= require('path')
const connection = require("./mongoose");

const forgetPassword = require("./Router/ForgotPassword");
const user=require("./Router/user")
const agent=require("./Router/agent")
const listing=require("./Router/listing")
const search=require("./Router/search")
const Email=require('./Router/Email')
const message=require('./Router/message')
const morgan = require('morgan');






const app = express();
app.use(express.static("public"));

// app.use(express.static(path.join(__dirname + "/public")));

connection.start();



app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true }))


app.use(morgan('tiny')) //logger
app.use("/", user);//signup
app.use("/", user);//login
app.use("/", user);//auth
app.use("/", user);//getUserDetails
app.use("/", forgetPassword);//forgot-password
app.use("/forgot-password", forgetPassword);//rest psw
app.use("/", agent);//all-agents
app.use("/", listing);//all-listing
app.use("/", search);//search
app.use("/", Email);//Sending Emails
app.use("/", message);//message



// console.log("app");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}


app.listen(port, function() {
  console.log("Server has started Successfuly");
});
