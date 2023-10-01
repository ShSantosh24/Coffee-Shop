require('dotenv').config()
const express = require ('express')  
const app = express()   
const path = require('path') 
const { logger, logEvents } = require('./middleware/logger')
const { errorHandler } = require('./middleware/errorHandler')  
const cookieParser = require('cookie-parser') 
const cors =require('cors') 
const corsOptions = require('./config/corsOptions') 
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')  
const { error } = require('console')
const PORT = process.env.PORT || 3500   

connectDB()

app.use(logger) 

app.use(express.json())//lets our app recieve and parse through json data put through  

app.use(cookieParser()) 

app.use(cors(corsOptions)) //Cors=Cross roigin Resource Sharing, this is here to allow our api to be accesiable to the public

app.use('/',express.static(path.join(__dirname,'public'))) //telling express where to find static files in the 'public' folder 

app.use('/',require('./routes/root'))  
app.use('./users',require('./routes/userRoutes'))



app.all('*',(req,res)=>{
    res.status(404) //checks if the response status to our API is 404 
        if(req.accepts('html"')){  //here in out root.js we havecertain get requsts and if said get request is not found the 404 error is then caught here and then sends a 404 html page as a response
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
        res.json({message:'404 not found'}) //sends a json repsonse back letting you know that the intended request was not found 
    }else{
        res.type('txt').send('404 not found')   //edge case (sends if a request did not accept neither a html or json)
    }

})   

app.use(errorHandler) 

mongoose.connection.once('open',() => {  
    console.log('Connected to mongodb successfully')
    app.listen(PORT,() => console.log(`Server running on Port ${PORT} `)) 
}) 

mongoose.connection.on('error',err=> {   //this is a function that allows us to log any errors that we may get by using our previously created Logevent function
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log') 
})


