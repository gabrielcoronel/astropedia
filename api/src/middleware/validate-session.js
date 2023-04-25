const sessionsRepository = require("../repositories/sessions-repository");

// Verfica que el token de verificación brindado corresponda
// a una sesión válida
const isAuthenticationTokenValid = async (token) => {
    // Obtiene la sesión con el token como id
    const session = await sessionsRepository.findById(token);

    // Verfica que esta sesión no sea nula
    return session != null;
};

// Middleware para validar sesiones
const middleware = async (req, res, next) => {
    // Lee el token de verificación de los headers
    const token = req.get("authorization");

    // Verifica que el token sea válido
    if (!(await isAuthenticationTokenValid(token))) {

        // Produce un error si no es válido
        res.status(400).send("Invalid authentication token");
        console.log("Received request with invalid authentication token");
    } else {
        // Continua la ejecución del evento de la ruta si el token
        // es válido
        next();
    }
};

module.exports = middleware;
