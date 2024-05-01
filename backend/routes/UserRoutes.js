const express = require("express")
const registerUser = require("../controller/UserController.js")
const router =express.Router();


router.post("/",registerUser);
module.exports =router;