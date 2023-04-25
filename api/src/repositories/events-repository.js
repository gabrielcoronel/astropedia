const mongoose = require("mongoose");

// Esquema para representar un evento astronómico
const schema = new mongoose.Schema({
    username: String,
    title: String,
    description: String,
    pictures: [String],
    date: Date
});

// Modelo que permite acceder a la colección de eventos
// astronómicos
const model = mongoose.model("Event", schema);

module.exports = model;