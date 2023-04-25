const sessionsRepository = require("../repositories/sessions-repository");

const isAuthenticationTokenValid = async (token) => {
    const session = await sessionsRepository.findById(token);

    return session != null;
};

const middleware = async (req, res, next) => {
    const token = req.get("authorization");

    if (!(await isAuthenticationTokenValid(token))) {
        res.status(400).send("Invalid authentication token");
        console.log("Received request with invalid authentication token");
    } else {
      next();
    }
};

module.exports = middleware;
