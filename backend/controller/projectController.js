const Project = require("../model/project.model");

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({success: false,  message: "Project not found",  });
    }
    res.status(200).json({success: true,project, });

  } catch (error) {
    res.status(500).json({success: false, message: error.message, });
  }
};