const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({ 
  username: String,
  password: String,
  firstname: String, 
  lastname: String,
  email: String, 
  location: String,
  jobposition: String,
  skills: [],
  aboutme: String
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;