const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const connectDB = require("./config/db.js")
const userRouter = require("./routes/UserRoutes.js")
const chatRouter = require("./routes/ChatRoute.js")
const messageRoutes = require("./routes/MessageRoutes.js")
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
port = process.env.PORT;
connectDB();

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
    console.log("server");
    res.send("hii world")
});


const server = app.listen(port, console.log("server started"))

const io = require("socket.io")(server, {
    // if user didnt send any message for 60s this will close the connection since for reducing bandwidth
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
    }
})

io.on("connection", (socket) => {
    console.log("connected to Socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected")
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room:" + room)
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room : " + room)
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("Stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new Message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;
        if (!chat.users) {
            return console.log("Chat user is not defined")
        }
        chat.users.forEach(user => {
            if (user._id == newMessageReceived.sender._id) {
                return;
            }
            //in means inside that users room send that message
            socket.in(user._id).emit("message received", newMessageReceived)
        })
    })
});





