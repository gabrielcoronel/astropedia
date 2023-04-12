const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: String
});

const model = mongoose.model("Session", schema);

module.exports = model;