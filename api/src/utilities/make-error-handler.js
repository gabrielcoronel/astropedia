const makeErrorHandler = (eventHandler) => {
    const errorHandler = (req, res) => {
        eventHandler(req, res)
            .catch((error) => res.status(500).send(error.toString()));
    };

    return errorHandler;
};

module.exports = makeErrorHandler;