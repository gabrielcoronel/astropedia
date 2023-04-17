const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: String,
    title: String,
    description: String,
    pictures: [String],
    date: Date
});

const model = mongoose.model("Event", schema);

module.exports = model;