const  mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title:String,  
    description:String,
    date:String,
    location:String
});

module.exports =  mongoose.model("Project", projectSchema);