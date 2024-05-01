const express =require("express");
const dotenv =require("dotenv");
const connectDB = require("./config/db.js")
const userRouter = require("./routes/UserRoutes.js")
dotenv.config();
const app =express();
app.use(express.json());
port =process.env.PORT;
connectDB();

app.use("/api/user",userRouter);
app.get("/", (req,res) => {
    console.log("server");
    res.send("hii world")
})

app.listen(port, console.log("server started"))

