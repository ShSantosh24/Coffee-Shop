const User = require('../models/User')  
const asyncHandler = require('express-async-handler') 
const bcrypt = require('bcrypt') //used to hash the password in order to increase user security 

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers= asyncHandler(async(req,res)=>{ 

    const users = await User.find().lean()
    if(!users?.length) {
        return res.status(400).json({message: "No user was found"})
    }
    res.json(users)

})
// @desc Create new user
// @route POST /users
// @access Private
const createNewUser= asyncHandler(async(req,res)=>{

    const { username, password } = req.body 

    // Confirm data
    if (!username || !password) {
        return res.status(400).json({message: "All fields are required"})
    } 

    // Check for duplicate username
    const duplicate = await Role.findOne({username}).lean().exec()

    if(duplicate) {
        return res.status(409).json({message: "Duplicate username"})
    }

    const roleObject = { name, rate }
    
    const role = await Role.create(roleObject)

    if (role) {
        res.status(201).json({message: `New role ${name} created`})
    } else {
        res.status(400).json({message: "Invalid role data receiver"})
    }

})
// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async(req,res)=>{

})
// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async(req,res)=>{

}) 

module.exports ={
    getAllUsers, 
    createNewUser,
    updateUser, 
    deleteUser
}
