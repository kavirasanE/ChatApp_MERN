const Chat = require("../models/chatModel.js");
const asyncHandler = require("express-async-handler")
const User = require("../models/UserModel.js")


const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    console.log("mainId" + req.user._id);
    console.log("userId" + userId)
    if (!userId) {
        console.log("param not send");
        return res.status(400)
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user_id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-password").populate("latestMessages");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });
    if (isChat.length > 0) {
        // res.send(isChat[0]);
        res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };
        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).send(fullChat);

        } catch (err) {
            throw new Error(err.message);
        }
    }
})

const fetchChats = asyncHandler(async (req, res) => {
    try {
        const fetchChat = await Chat.find({
            users: { $elemMatch: { $eq: req.user._id } }
        }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessages")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessages.sender",
                    select: "name pic email",
                });
                res.status(200).send(results);
            })

        //.then(result => res.send(result))
    } catch (err) {
        throw new Error(err.message);
    }
})

const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.users) {
        return res.status(400).send({ message: " please fill all the fields" })
    }
    var users = JSON.parse(req.body.users);
    if (users.length < 2) {
        return res.status(400).send("more than 2 users should be there");
    }
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password").populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);

    } catch (err) {
        return res.status(400).send("More then 2 Users are required to form a group chat ")
    }
})

const renameGroup = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body;

    const updateChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName
        },
        {
            new: true,
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updateChat) {
        res.status(400)
        throw new Error("Chat Not Found");
    } else {
        res.json(updateChat);
    }
})

const addToGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
    const added = await Chat.findByIdAndUpdate(chatId, {
        $push: { users: userId },
    }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password");
    if (!added) {
        res.status(400);
        throw new Error(" Message nont Found");
    } else {
        res.json(added);
    }
})


const removeFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;

    const removeGroup = await Chat.findByIdAndUpdate(chatId, {
        $pull: { users: userId },
    },
        { new: true }).populate("users", "-password").populate("groupAdmin", "-password");

    if (!removeGroup) {
        res.status(400);
        throw new Error("nOt fFounsd");

    } else {
        res.json(removeGroup);
    }
})



module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup }