const express = require("express");
const eventsRepository = require("../repositories/events-repository");
const validateSessionMiddleware = require("../middleware/validate-session");

const router = express.Router();

const getUserEvents = async (username) => {
    const events = await eventsRepository.find({ username });

    return events;
};

const getEventById = async (id) => {
    const event = await eventsRepository.findById(id);

    return event;
};

const storeEvent = async (username, event) => {
    await eventsRepository.create({
        ...event,
        username
    });
};

const updateEvent = async (id, event) => {
    await eventsRepository.updateOne({ _id: id }, { $set: event });
};

const deleteEvent = async (id) => {
    await eventsRepository.deleteOne(({ _id: id }));
};

router.use(validateSessionMiddleware);

router.post("/getUserEvents", async (req, res) => {
    const { username } = req.body;

    getUserEvents(username)
        .then((events) => res.json(events))
        .catch((error) => res.status(400).send(error));
});

router.post("/getEventById", (req, res) => {
    const { id } = req.body;

    getEventById(id)
        .then((event) => res.json(event))
        .catch((error) => res.status(400).send(error));
});

router.post("/storeEvent", (req, res) => {
    const { username, ...event } = req.body;

    storeEvent(username, event)
        .then(() => res.sendStatus(200))
        .catch((error) => res.status(400).send(error));
});

router.post("/updateEvent", (req, res) => {
    const { id, ...event } = req.body;

    updateEvent(id, event)
        .then(() => res.sendStatus(200))
        .catch((error) => res.status(400).send(error));
});

router.post("/deleteEvent", (req, res) => {
    const { id } = req.body;

    deleteEvent(id)
        .then(() => res.sendStatus(200))
        .catch((error) => res.status(400).send(error));
});

module.exports = router;