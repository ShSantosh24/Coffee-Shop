const mongoose = require('mongoose') 

const userSchema = new mongoose.Schema({
    username:{
        type:String, 
        required:true
    }, 
    password:{
        type:String, 
        required:true
    }, 
    roles:[{
        type:String,  
        default:'Consumer'
    }], 

}) 

module.exports = moongoose.model("User",userSchema)