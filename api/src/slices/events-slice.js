const express = require("express");
const usersRepository = require("../repositories/users-repository");
const validateSessionMiddleware = require("../utilities/validate-session-middleware");

const router = express.Router();

const getUserEvents = async (username) => {
    const events = await usersRepository.find({ username });

    return events;
};

const getEventById = async (id) => {
    const event = await usersRepository.findById(id);

    return event;
};

const storeEvent = async (username, event) => {
    await usersRepository.create({
        ...event,
        username
    });
};

const updateEvent = async (id, event) => {
    await usersRepository.updateOne({ _id: id }, { $set: event });
};

const deleteEvent = async (id) => {
    await usersRepository.deleteOne(({ _id: id }));
};

router.use(validateSessionMiddleware);

router.get("/getUserEvents", async (req, res) => {
    const { username } = req.body;

    getUserEvents(username)
        .then((events) => res.json(events))
        .catch((error) => res.status(400).send(error));
});

router.get("/getEventById", (req, res) => {
    const { id } = req.body;

    getEventById(id)
        .then((event) => res.json(event))
        .catch((error) => res.status(400).send(error));
});

router.post("/storeEvent", (req, res) => {
    const { username, ...event } = req.body;

    storeEvent(username, event)
        .catch((error) => res.status(400).send(error));
});

router.put("/updateEvent", (req, res) => {
    const { id, ...event } = req.body;

    updateEvent(id, event)
        .catch((error) => res.status(400).send(error));
});

router.delete("/deleteEvent", (req, res) => {
    const { id } = req.body;

    deleteEvent(id)
        .catch((error) => res.status(400).send(error));
});

module.exports = router;