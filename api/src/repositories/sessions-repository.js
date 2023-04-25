const mongoose = require("mongoose");

// Esquema para representar una sesión
const schema = new mongoose.Schema({
    username: String
});

// Modelo para acceder a la colección de sesiones
const model = mongoose.model("Session", schema);

module.exports = model;