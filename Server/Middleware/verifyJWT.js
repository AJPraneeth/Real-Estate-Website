
const express= require('express');
const jwt =require("jsonwebtoken");



process.env.SECRET_KEY='secret';

 const verifyJWT=(req,res,next)=>{
    const token=req.headers["x-access-token"]
   
    console.log(token);
    if (token!==null) {
       
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if (err) return res.json({
                isLoggedIn:false,
                message:"Failed to Authenticate"
            })
            req.user={}
            req.user._id=decoded._id
            req.user.name=decoded.name
            req.user.email=decoded.email
            req.user.isAdmin=decoded.isAdmin
            
            next()
        })

      
    } else {
        
        res.status(404).json({
            message:"Token verification failed",
            isLoggedIn:false
        })
    }


}

module.exports=verifyJWT