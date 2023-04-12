const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan")
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = Number(process.env.PORT);
const CONNECTION_URI = process.env.MONGO_CONNECTION_URI
const api = express();

const authenticationRouter = require("./slices/authentication-slice");
const eventsRouter = require("./slices/events-slice");

api.use(bodyParser.json({ limit: "50mb" }));
api.use(morgan("tiny"));
api.use(cors());
api.use("/authentication", authenticationRouter);
api.use("/events", eventsRouter);

mongoose.connect(CONNECTION_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(() => console.log("Could not connecto MongoDB Atlas"));

api.listen(PORT, () => console.log(`Listening on port ${PORT}`));