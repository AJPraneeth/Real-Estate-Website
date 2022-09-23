const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema= new mongoose.Schema(
    {
        clientName:{
            type:String,
             require:true
        },
        clientEmail:{
            type:String,
             require:true
        },
        clientPhone:{
            type:String,
             require:true
        },
        clientTitle:{
            type:String,
             require:true
        },
        clientMessage:{
            type:String,
             require:true
        },
        to:String,

        read:{
            type:Boolean,
            default:false
        }


    }
)



const Message =mongoose.model("Message",MessageSchema);
module.exports=Message;