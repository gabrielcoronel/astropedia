const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan")
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const PORT = Number(process.env.PORT);
const api = express();

api.use(bodyParser.json({ limit: "50mb" }));
api.use(morgan("tiny"));
api.use(cors());

mongoose.connect(MONGO_CONNECTION_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(() => console.log("Could not connecto MongoDB Atlas"));

api.listen(PORT, () => console.log(`Listening on port ${PORT}`));