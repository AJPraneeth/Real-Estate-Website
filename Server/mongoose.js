
const mongoose =require('mongoose');

exports.start = () => {
    mongoose.connect("mongodb://localhost:27017/RealEstateDB", (err) => {
        if(!err){
            console.log('Connected to MongoDB!!!');
        }else{ 
            console.log('Failed to Connect MongoDB!!!'); 
            throw err;
        }
     })
};


// mongodb://localhost:27017/RealEstateDB
// mongodb+srv://Primehome:163920@cluster0.7rmtwf5.mongodb.net/RealEstateDB