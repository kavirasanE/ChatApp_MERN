const express = require("express");
const validToken = require("../config/validToken.js");
const {sendMessage ,allMessages} = require("../controller/MessageControllers.js");
const router = express.Router();


router.route("/").post(validToken, sendMessage);
 router.route("/:chatId").get(validToken, allMessages);



module.exports = router;