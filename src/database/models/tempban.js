const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  guildId: String,
  UserId: String,
  expires: Date,
});

module.exports = mongoose.model("tempban", Schema);
