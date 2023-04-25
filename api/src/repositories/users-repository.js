const mongoose = require("mongoose");

// Esquema para representar a un usuario
const schema = new mongoose.Schema({
    username: String,
    password: String,
    picture: String
});

// Modelo para acceder a la colección de usuarios
const model = mongoose.model("User", schema);

module.exports = model;