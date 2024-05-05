const express = require("express");
const {accessChat,fetchChats, createGroupChat,renameGroup,addToGroup,removeFromGroup} = require("../controller/ChatController.js")
const validToken = require("../config/validToken.js");


const router = express.Router();

router.route("/").post(validToken,accessChat);
router.route("/").get(validToken,fetchChats);
router.route("/group").post(validToken, createGroupChat);
router.route("/rename").put(validToken, renameGroup);
router.route("/groupremove").put(validToken, removeFromGroup);
router.route("/groupadd").put(validToken,addToGroup);


module.exports= router