const mongoose=require('mongoose')

const register=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        default: 'user' }

},{ timestamps: true });

const registermodel=mongoose.model('users',register);
module.exports=registermodel;