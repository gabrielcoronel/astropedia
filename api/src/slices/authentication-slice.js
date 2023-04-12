const express = require("express");
const bcrypt = require("bcrypt");
const usersRepository = require("../repositories/users-repository");
const sessionsRepository = require("../repositories/sessions-repository");

const router = express.Router();

const encrypt = async (message) => {
    const key = process.env.ENCRYPTION_KEY;
    const hash = await bcrypt.hash(message, key);

    return hash;
};

const isUsernameTaken = async (username) => {
    const optionalUser = await usersRepository.findOne({ username: username });

    return optionalUser != null;
};

const areCredentialsValid = async (credentials) => {
    const optionalUser = await usersRepository.findOne({
        username: credentials.username
    });

    if (optionalUser == null) {
        return false;
    }

    const isPasswordCorrect = await bcrypt.compare(
        credentials.password,
        optionalUser.password
    );
     
    return isPasswordCorrect;
}

const storeAccount = async (account) => {
    const encryptedPassword = await encrypt(account.password);

    const storedAccount = {
        ...account,
        password: encryptedPassword
    };

    await usersRepository.create(storedAccount);
};

const createSession = async (username) => {
    const createdSession = await sessionsRepository.create({ username });

    const session = {
        username: createdSession.username,
        token: createdSession._id
    }

    return session;
};

router.post("/signUp", async (req, res) => {
    const account = req.body;

    if (await isUsernameTaken(account.username)) {
        res.status(400).send("Username is already taken");
        return;
    }

    await storeAccount(account);

    const session = await createSession(account.username);

    res.json(session);
});

router.post("/logIn", async (req, res) => {
    const credentials = req.body;

    if (!(await areCredentialsValid(credentials))) {
        res.status(400).send("Credentials are invalid");
        return;
    }

    const session = await createSession(credentials.username);

    res.json(session);
});

module.exports = router;