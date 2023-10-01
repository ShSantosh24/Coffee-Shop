const express = require('express') 
const router = express.Router() //router function is a capability of express 
const path =require('path') //the "require" here is used when we need soething from node.js such as in this case path 

router.get('^/$|/index(.html)?', (req,res)=> {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})    

module.exports = router