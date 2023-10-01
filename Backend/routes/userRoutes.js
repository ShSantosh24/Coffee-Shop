const express = require('express')
const router = express.Router()
const userController = require('../controller/userController') 

router.route('/')                      //CRUD(Create,Read,Update,Delete) used to deal with each respective request that comes in from our controller
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router