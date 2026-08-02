const express = require("express");
const { Validate_Input } = require("../middleware/validate.js");
const { SendMail } = require("../controller/contactController.js");
const router = express.Router();

router.post("/contact", Validate_Input, SendMail);

module.exports = router;