const asyncHandler = require("express-async-handler")
const User = require("../models/UserModel.js")
const generateToken = require("../config/generateToken.js")
const bcrypt =require ("bcrypt")

const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;
   if (!name || !email || !password) {
      res.status(400)
      throw new Error("Please Enter all the fields");
   }
   const UserExists = await User.findOne({ email });
   const hashedPassword = bcrypt.hash(password,10);
   if (UserExists) {
      res.status(400);
      throw new Error("User already exists");
   }
   const user = await User.create({
      name,
      email,
      password:hashedPassword,
   })

   if (user) {
      res.status(201).json({
         _id: user.id,
         name: user.name,
         email: user.email,
         token: generateToken(user._id)
      })
   } else {
      res.status(400)
      throw new Error("Failed to Create the User");
   }
})

const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const emailExists = await User.findOne({ email });
     const comparePassword = bcrypt.compare(password,emailExists.password);
   if (emailExists && comparePassword) {
      res.status(200).json({
         _id: emailExists.id,
         email: emailExists.email,
         password: emailExists.password,
         token: generateToken(emailExists._id)
      })
   }

})

module.exports = { registerUser, authUser };