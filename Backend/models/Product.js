const { Double } = require('mongodb')
const mongoose = require('mongoose') 

const productSchema = new mongoose.Schema({
    title:{
        type:String, 
        required:true
    }, 
    description:{
        type:String, 
        required:true
    }, 
    price:{
        type:Double,  
        required:true
    }, 
    images:[{ 
        public_id:{
            type:Double,  
            required:true
        }, 
        url:{
            type:String,  
            required:true
        }, 
    }], 
    stock:{
        type:Number,  
        required:true
    }, 
}) 

module.exports = moongoose.model("Product",productSchema)