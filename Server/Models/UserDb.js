const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const userSchema= new mongoose.Schema(
{
    name: {
        type:String,
        require:true
    } ,

    email:{
        type:String,
        require:true
    },

    password : {
        type:String,
        require:true
    },

    confirmPassword : {
        type:String,
        require:true
    },
    
    isAdmin: {
        type: Boolean,
        default: false,
      },
    phone:String,
    address:String,
    city:String,
    province:String,
    about:String,
    image:String
    }

);

// module.exports= User=mongoose.model("User",userSchema);

const User = mongoose.model("User", userSchema);

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = { User, validate };
// module.exports = User;
