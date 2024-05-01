const express =require("express");
const dotenv =require("dotenv");

const app =express();
app.use(express.json());
dotenv.config();

port =process.env.PORT;

app.get("/", (req,res) => {
    console.log("server");
    res.send("hii world")
})

app.listen(port, console.log("server started"))

