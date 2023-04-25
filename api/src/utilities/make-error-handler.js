// Envuelve un endpoint para maneja su error de una manera
// conveniente
const makeErrorHandler = (eventHandler) => {
    // La función resultante
    const errorHandler = (req, res) => {
        eventHandler(req, res)
            // Cuando el endpoint produce un error se envía código 500 y se
            // imprime el error en consola
            .catch((error) => res.status(500).send(error.toString()));
    };

    return errorHandler;
};

module.exports = makeErrorHandler;