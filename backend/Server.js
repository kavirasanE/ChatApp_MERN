const express =require("express");
const dotenv =require("dotenv");
const cors =require("cors")
const connectDB = require("./config/db.js")
const userRouter = require("./routes/UserRoutes.js")
const chatRouter =require("./routes/ChatRoute.js")
dotenv.config();
const app =express();
app.use(express.json());
app.use(cors());
port =process.env.PORT;
connectDB();

app.use("/api/user",userRouter);
app.use("/api/chat",chatRouter);
app.get("/", (req,res) => {
    console.log("server");
    res.send("hii world")
})

app.listen(port, console.log("server started"))

