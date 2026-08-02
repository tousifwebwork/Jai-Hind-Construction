const mongoose = require("mongoose");

exports.connect_DB =()=>{
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
      console.log("Database Connection Failed:", error.message);
      process.exit(1);
    });
}
 