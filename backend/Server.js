const express =require("express");
const dotenv =require("dotenv");
const connectDB = require("./config/db.js")
dotenv.config();
const app =express();
app.use(express.json());
port =process.env.PORT;
connectDB();


app.get("/", (req,res) => {
    console.log("server");
    res.send("hii world")
})

app.listen(port, console.log("server started"))

