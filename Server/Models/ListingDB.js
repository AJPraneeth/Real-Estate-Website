const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const ListingSchema= new mongoose.Schema(
   { title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },

    image1:String,
    image2:String,
    image3:String,
    image4:String,
    
    amenities:{
        type: String,
        
    },

    agent:{ 
        type:String,
        require:true    
    },

    bedroom: Number,

    Status:{
        type:Boolean,
        default:true
    },
    
    bathroom:Number,
  

    kitchen:{
        type:Boolean,
        require:true
    },

    floor:Number,

    garage:{
        type:Boolean,
        require:true
    },

     no:String ,

    address:{
        type:String,
        require:true
    },
    province:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    street:{
        type:String,
        
    },

    featured :{
        type:Boolean,
        default:true
    },   

    listedIn:{
        type:String,
        require:true
    } ,

    category:{
        type:String,
        require:true
    }

}

);

const Listing =mongoose.model("Listing",ListingSchema);
module.exports=Listing;