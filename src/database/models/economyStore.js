const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Guild: String,
    Item: String,
    Amount: Number
});

module.exports = mongoose.model("economyStore", Schema);