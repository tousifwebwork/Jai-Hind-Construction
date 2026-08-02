const express = require("express");
const {getProject,} = require("../controller/projectController");

const router = express.Router();
 
router.get("/:id", getProject);

module.exporst =  router;