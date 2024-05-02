const expressAsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();

const validToken = expressAsyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    token = authHeader.split(" ")[1];

    if (authHeader && authHeader.startsWith("Bearer")) {
        jwt.verify(token, process.env.KEY, (err, decoded) => {
            if (err) {
              res.status(400);
              console.log("Error : your ae not authorized")
            }
            req.user =decoded.user;
            next();
        });
        if(!token){
            res.status(400);
            console.log("you are not Authorized")
        }
    }
})

module.exports = validToken;
