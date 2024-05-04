const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User =require("../models/UserModel");
const dotenv = require("dotenv")

dotenv.config();

const validToken = asyncHandler(async (req, res, next) => {
    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        try {
            token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.KEY);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }
        // jwt.verify(token, process.env.KEY, (err, decoded) => {
        //     if (err) {
        //         res.status(400);
        //         console.log("Error : your ae not authorized")
        //     }
        //     req.user = decoded.user;
        //     next();
        // });
        catch (err) {
            res.status(400);
            console.log("you are not Authorized")
        }
        if(!token){
            res.status(401);
            throw new Error("Not authorized, no token")
        }
    }
})

module.exports = validToken;


