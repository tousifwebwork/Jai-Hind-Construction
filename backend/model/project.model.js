const  mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title:String,  
    description:String,
    date:String,
    location:String,
    img_url:String
});

module.exports =  mongoose.model("Project", projectSchema);