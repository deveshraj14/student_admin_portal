const Joi = require("joi")
// import { schema } from "../models/registered"

const signupvalidation=(req,resp,next)=>{
   const schema =  Joi.object({
    name : Joi.string().min(4).max(500).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).max(10).required(),
})
const {err}=schema.validate(req.body)

// Validate the incoming data (req.body).
// If there's something wrong (like an invalid email or a missing password), it will store the problem in the error variable.

if(err)
{
    resp.status(400).json("bad message");
}
next();
}



const loginvalidation=(req,resp,next)=>{
    const schema =  Joi.object({
     name : Joi.string().min(4).max(500).required(),

     password : Joi.string().min(6).max(10).required(),
 })
 const {err}=schema.validate(req.body)
 
 
 // Validate the incoming data (req.body).
 // If there's something wrong (like an invalid email or a missing password), it will store the problem in the error variable.
 
 if(err)
 {
     resp.status(400).json("bad message");
 }
 next();
 }
 



module.exports={
    loginvalidation,
    signupvalidation
}



