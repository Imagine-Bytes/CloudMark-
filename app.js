const express = require("express");
const config = require("./config/config")
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser")
const app = express();


const connectionString = config.URI;

//Configure MongoDB Database
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("MongoDB Database Running Successfully");
  })
  .catch((err) => {
    console.log("Database Connection Failed ");
  });

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

//To handle cors errors
app.use(cors());

// app.use(express.static("public"));
// //app.use("/static", express.static(path.resolve(__dirname, "public")));

// Routes
app.use("/", require("./routes/index.js"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
