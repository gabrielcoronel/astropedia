const express = require("express");
const eventsRepository = require("../repositories/events-repository");
const validateSessionMiddleware = require("../middleware/validate-session");

// Router para el servicio que realiza operaciones CRUD en los eventos
// astronomicos
const router = express.Router();

// Obtiene todos los eventos asociaods a un usuario
const getUserEvents = async (username) => {
    // Busca los eventos en la colección de eventos astronómicos
    const events = await eventsRepository.find({ username });

    return events;
};

// Obtiene el evento con el id dado
const getEventById = async (id) => {
    // Busca el evento por id en la colección de evento astronómicos
    const event = await eventsRepository.findById(id);

    return event;
};

// Almacena un evento astronómico en la base datos
const storeEvent = async (username, event) => {
    // Crea el evento en la colección de eventos
    await eventsRepository.create({
        ...event,
        username
    });
};

// Actualiza los datos en un evento con el id dado
const updateEvent = async (id, event) => {
    // Remplaza los datos del evento con el ide dao en la colección
    await eventsRepository.updateOne({ _id: id }, { $set: event });
};

// Elimina un evento de la base datos
const deleteEvent = async (id) => {
    await eventsRepository.deleteOne(({ _id: id }));
};

// Incluye el middleware para validar una sesión en todas operaciones
// del router
router.use(validateSessionMiddleware);

// Endpoint para obtener todos los eventos de un usuario
router.post("/getUserEvents", async (req, res) => {
    // Se lee el nombre de usuario del cuerpo
    const { username } = req.body;

    // Se obtienen los eventos
    const events = await getUserEvents(username);

    // Se devuelven los eventos al cliente
    res.json(events);
});

// Endpoint para obtener el evento con un id
router.post("/getEventById", async (req, res) => {
    // Se lee el id del cuerpo
    const { id } = req.body;

    // Se obtiene el evento
    const event = await getEventById(id);

    // Se devuelve el evento al cliente
    res.json(event);
});

// Endpoint para almacenar un evento
router.post("/storeEvent", async (req, res) => {
    // Se leen los datos necesario del cuerpo
    const { username, ...event } = req.body;

    // Se almacena el evento
    await storeEvent(username, event);

    // Se devuekve el evento al cliente
    res.json(event);
});

// Endpoint para actualizar un evento
router.post("/updateEvent", async (req, res) => {
    // Se leen los datos necesario del cuerpo
    const { id, ...event } = req.body;

    // Se actualiza el evento
    await updateEvent(id, event);

    // Se devuelve una respuesta nula
    res.json({});
});

// Endpoint para eliminar un evento
router.post("/deleteEvent", async (req, res) => {
    // Se lee el id del cuerpo
    const { id } = req.body;

    // Se elimina el evento con el id en cuestión
    await deleteEvent(id);

    // Se devuelve una respuesta nula
    res.json({});
});

module.exports = router;