const express = require("express")
const {registerUser, authUser, allUsers} = require("../controller/UserController.js")
const validToken =require ("../config/validToken.js")
const router =express.Router();

// /api/user

router.post("/",registerUser);

router.post("/login",authUser);

router.route("/").get(allUsers);


module.exports =router;