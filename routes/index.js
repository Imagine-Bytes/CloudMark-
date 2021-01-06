const express = require("express");
const router = express.Router();
const verifyToken = require("../helpers/verifyToken");
const generateToken = require("../helpers/generateToken");
const logOut = require("../helpers/logOut");
const User =  require("../models/user")


//Register User
router.post("/register", (req, res) => {
    const userData = {
      username: req.body.username,
      password: req.body.password,
    };
    User.findOne({
      username: req.body.username,
    })
      .then((user) => {
        if (!user) {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            userData.password = hash;
            User.create(userData)
              .then((user) => {
                res.send({ message: " User Registered" });
              })
              .catch((err) => {
                res.send({ error: "Register Failed" });
                return;
              });
          });
        } else {
          res.send({ error: "User already exists" });
          return;
        }
      })
      .catch((err) => {
        res.send({ error: err });
        return;
      });
  });


//Login User
router.post("/login", (req, res) => {
    User.findOne({ username: req.body.username })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const username = user.username;
            generateToken(res, username);
            return;
          } else {
            res.send({ error: "Password is incorrect" });
            return;
          }
        }
        res.send({ error: "User doesn't exist" });
      })
      .catch((err) => {
        res.send({ error: err });
      });
  });
  

// Welcome Page
router.get("/", verifyToken, (req, res) => res.render("home"));

// Logout 
router.get("/", logOut, (req, res) => res.render("login"));
//404
router.get("/", (req, res) => res.render("errorPage"));

module.exports = router;