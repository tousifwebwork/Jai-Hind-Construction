const express = require("express");
const { getProjects, getProject } = require("../controller/projectController");

const router = express.Router();
 
router.get("/", getProjects);
router.get("/:id", getProject);

module.exports =  router;