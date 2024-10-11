const mongoose=require("mongoose")
const express=require('express')
const cors=require('cors')
const app=express()
const dotenv=require('dotenv');
const Data=require("./Database/database")
const Authcon=require("./Routes/Authrouter")
// const Assignmentroutes = require('./Routes/Assignmentrouter'); // New assignment routes
// require('dotenv').config();
app.use(express.json());
dotenv.config({});
const PORT=process.env.PORT||8000

app.use(cors());
app.use('/auth',Authcon)
// app.use('/auth', Assignmentroutes); 
Data();
app.listen(PORT,()=>{    
    // Data();  
    console.log(`server is running at ${PORT}`)
})  
   