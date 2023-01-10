const mongoose = require("mongoose");
const kittySchema = new mongoose.Schema({
  Email: String,
  Name: String,
  City: String,
});
const user = mongoose.model("user", kittySchema);
module.exports = user;
