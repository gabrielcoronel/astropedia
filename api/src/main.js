const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan")
const mongoose = require("mongoose");
const cors = require("cors");

// Se insertan las variables del archivo de configuración en
// el entorno
require("dotenv").config();

// Se lee el puerto del entorno
const PORT = Number(process.env.PORT);

// Se lee la cadena de conexión del entorno
const CONNECTION_URI = process.env.MONGODB_CONNECTION_URI

// Se instancia una api de express
const api = express();

// Se importan los distintos servicios
const authenticationRouter = require("./services/authentication-service");
const eventsRouter = require("./services/events-service");

// Se instala el middleware para procesar datos tipo JSON
api.use(bodyParser.json({ limit: "50mb" }));

// Se instala el middleware para loggear solicitudes
api.use(morgan("tiny"));

// Se instala el middleware para desabilitar CORS
api.use(cors());

// Instalan los servicios en sus correspondientes rutas
api.use("/authentication", authenticationRouter);
api.use("/events", eventsRouter);

// Se conecta globalmente a la base de datos de MongoDB Atlas
mongoose.connect(CONNECTION_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(() => console.log("Could not connect to MongoDB Atlas"));

// Se inicia el servidor en el puerto en cuestión
api.listen(PORT, () => console.log(`Listening on port ${PORT}`));