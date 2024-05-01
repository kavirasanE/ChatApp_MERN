const express =require("express");

const jwt =require ("jsonwebtoken");
const generatToken = async (id) => {
    return jwt.sign({id}, process.env.KEY,{expiresIn:"30d"});
};

module.exports=generatToken;