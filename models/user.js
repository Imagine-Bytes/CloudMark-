const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    default:"Light"
    },
    bookmarks: {
     type: Array,
     default:[]
  }
  
});

module.exports = mongoose.model("User", UserSchema);
