const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  Guild: String,
  boostMessage: String,
  UnboostMessage: String,
});

module.exports = mongoose.model("boostMessage", Schema);
