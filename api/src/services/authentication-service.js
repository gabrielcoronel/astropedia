const express = require("express");
const bcrypt = require("bcrypt");
const usersRepository = require("../repositories/users-repository");
const sessionsRepository = require("../repositories/sessions-repository");
const makeErrorHandler = require("../utilities/make-error-handler");

// Router para el servicio de autenticación
const router = express.Router();

// Encripta un mensaje arbitrario usando el algoritmo
// bcrypt
const encrypt = async (message) => {
    // Lee la llave de encriptación de las variables de entorno
    const key = process.env.ENCRYPTION_KEY;

    // Encrypta el mensaje
    const hash = await bcrypt.hash(message, key);

    return hash;
};

// Revisa si el nombre de usuario dado ya está tomado
const isUsernameTaken = async (username) => {
    // Busca en la colección de usuarios uno que tenga el nombre de usuario dado
    const optionalUser = await usersRepository.findOne({ username: username });

    // Si existe tal usuario, el nombre usuario ya está tomado
    return optionalUser != null;
};

// Se asegura que las creedeciales dadas sean válidas
const areCredentialsValid = async (credentials) => {
    // Busca un usuasio que tenga el nombre de usuario dado
    const optionalUser = await usersRepository.findOne({
        username: credentials.username
    });

    // Si no existe tal usuario, las credenciales son inválidas
    if (optionalUser == null) {
        return false;
    }

    // Compara la contraseña dada con la contraseña encriptada
    // en la base de datos
    const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        optionalUser.password
    );
     
    return isPasswordCorrect;
}

// Almacena los datos de una nueva cuenta en la base datos
const storeAccount = async (account) => {
    // Encripta la contraseña
    const encryptedPassword = await encrypt(account.password);

    // Prepara un objeto a almacenar en la base datos
    const storedAccount = {
        ...account,
        password: encryptedPassword
    };

    // Almacena el objeto
    await usersRepository.create(storedAccount);
};

// Crea una nueva sesión para el usuario con el nombre de usuario dado
const createSession = async (username) => {
    // Crea la sesión en la base datos
    const createdSession = await sessionsRepository.create({ username });

    // Incluye el nombre de usuario en la sesión almacenada en la base
    // de datos
    const session = {
        username: createdSession.username,
        token: createdSession._id
    }

    return session;
};

// Endpoint para crear cuentas mediante la API
const signUp = async (req, res) => {
    // Se lee la informacion de la cuenta a creer del cuerpo
    // de la solicitud
    const account = req.body;

    // Si el nombre de usuario está tomado, se produce un error
    if (await isUsernameTaken(account.username)) {
        res.status(400).send("USERNAME_TAKEN");
        return;
    }

    // De contrario de almacena la cuenta
    await storeAccount(account);

    // Se crea una sesión para la cuenta creada
    const session = await createSession(account.username);

    // Se devuelve la sesión al cliente
    res.json(session);
};

// Endpoint para crear sesiones para cuentas existentes
const logIn = async (req, res) => {
    // Se leen las credenciales
    const credentials = req.body;

    // Si las credenciales no son válidas se produce un error
    if (!(await areCredentialsValid(credentials))) {
        res.status(400).send("INVALID_CREDENTIALS");
        return;
    }

    // De lo contrario se crea una sesión para la cuenta ya existente
    const session = await createSession(credentials.username);

    // Se devuelve la sesión al cliente
    res.json(session);
};

// Se montan los endpoints en sus respectivas rutas
router.post("/signUp", makeErrorHandler(signUp));
router.post("/logIn", makeErrorHandler(logIn));

module.exports = router;