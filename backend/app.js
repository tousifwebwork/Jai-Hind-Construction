const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const hpp = require("hpp");
const morgan = require("morgan");
const Contact_Route = require('./router/contact')
const DB_Route = require('./router/projectRoute')
const {connect_DB} = require('./config/mongo')

connect_DB();
const app = express();
const PORT = process.env.PORT || 5000; 

app.use(cors({ origin: process.env.CLIENT_URL,credentials: true,}));
app.use(helmet());
app.use(hpp());
app.use(compression());
app.use(morgan("dev"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => { 
    res.status(200).json({ success: true, message: "API Running 🚀", });
});

app.use('/api/contact',Contact_Route);
app.use('/api/project',DB_Route);
   

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`); 
});