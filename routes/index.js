const express = require("express");
const router = express.Router();




// Welcome Page
router.get("/", (req, res) => res.render("dashboard"));

//404
// router.get("/*", (req, res) => res.render("404"));

module.exports = router;
