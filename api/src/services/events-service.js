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

    const events = await getUserEvents(username);

    res.json(events);
});

router.post("/getEventById", async (req, res) => {
    const { id } = req.body;

    const event = await getEventById(id);

    res.json(event);
});

router.post("/storeEvent", async (req, res) => {
    const { username, ...event } = req.body;

    await storeEvent(username, event);

    res.json(event);
});

router.post("/updateEvent", async (req, res) => {
    const { id, ...event } = req.body;

    await updateEvent(id, event);

    res.json({});
});

router.post("/deleteEvent", async (req, res) => {
    const { id } = req.body;

    await deleteEvent(id);

    res.json({});
});

module.exports = router;
