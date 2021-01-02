const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser")
const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

//To handle cors errors
app.use(cors());

app.use(express.static("public"));
//app.use("/static", express.static(path.resolve(__dirname, "public")));

// Routes
app.use("/", require("./routes/index.js"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
