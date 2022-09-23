const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const agentSchema= new mongoose.Schema (
{
   Name:{
    type:String,
    require:true
   },

   email:{
    type:String,
    require:true
   }, 

   phone:{
    type:String,
    require:true
   },

   address:{
    type:String,
    require:true
   },

   province:{
    type:String,
    require:true
   },
   City:{
    type:String,
    require:true
   },
   image: String,

   about:{
    type:String,
    require:true
   },

   facebook:String,
   instagram:String,
   twitter:String,
   linkedin:String,

   featured:{
    type:Boolean,
    require:true
   }
}
);

const Agent =mongoose.model("Agent",agentSchema);
module.exports=Agent;

// const Kalindu = new Agent (
//     {
        // Name :"Kalindu Werasingha",
        // email: "kalindu@gmail.com",
        // phone: "0771234567",
        // address: "No:2 Hubutiyawa Nittambuwa ",
        // province: "Western",
        // City: "Nittambuwa",
        // image: "agent1.jpg",
        // about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
        // facebook: "https://www.facebook.com/Kalindu.werasingha.9655/",
        // instagram: "https://www.instaram.com/Kalindu.werasingha.9655/",
        // twitter: "https://www.twitter.com/Kalindu.werasingha.9655/",
        // linkedin: "https://www.linkedin.com/Kalindu.werasingha.9655/",
        // featured: true
    // }
// );

// const Lavan= new Agent (
//     {
//         Name :"Lavan Depasara",
//         email: "lavan@gmail.com",
//         phone: "0777894561",
//         address: "No:36 Kaburupitiya Mathara",
//         province: "South",
//         City: "Mathara",
//         image: "agent2.jpg",
//         about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
//         facebook: "https://www.facebook.com/lavan.depasara.9655/",
//         instagram: "https://www.instaram.com/lavan.depasara.9655/",
//         twitter: "https://www.twitter.com/lavan.depasara.9655/",
//         linkedin: "https://www.linkedin.com/lavan.depasara.9655/",
//         featured: true
//     }
// );

// const Sanindu= new Agent (
//     {
//         Name :"Sannidu Sadamal",
//         email: "sanidu@gmail.com",
//         phone: "07772587419",
//         address: "No:36 Elibichchiya Pannala",
//         province: "North Western",
//         City: "Kurunegala",
//         image: "agent3.jpg",
//         about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
//         facebook: "https://www.facebook.com/sannidu.sadamal.9655/",
//         instagram: "https://www.instaram.com/sannidu.sadamal.9655/",
//         twitter: "https://www.twitter.com/sannidu.sadamal.9655/",
//         linkedin: "https://www.linkedin.com/sannidu.sadamal.9655/",
//         featured: true
//     }
// );

// const Kanchana= new Agent (
//     {
//         Name :"Kanchana Krishnamurthi",
//         email: "kanchana@gmail.com",
//         phone: "07772587419",
//         address: "No:36 mathale juntion anurdhapura",
//         province: "North Central",
//         City: "Anuradapura",
//         image: "agent4.jpg",
//         about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea",
//         facebook: "https://www.facebook.com/Nadesh.Krishnamurthi.9655/",
//         instagram: "https://www.instaram.com/Nadesh.Krishnamurthi.9655/",
//         twitter: "https://www.twitter.com/Nadesh.Krishnamurthi.9655/",
//         linkedin: "https://www.linkedin.com/Nadesh.Krishnamurthi.9655/",
//         featured: true
//     }
// );

