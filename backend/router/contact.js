import express from "express";
import { Validate_Input } from "../middleware/validate.js";
import { SendMail } from "../controller/contactController.js";

const router = express.Router();

router.post("/contact", Validate_Input, SendMail);

export default router;