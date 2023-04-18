module.exports = (error, req, res, next) => {
    if (error) {
        if (error.message) res.status(res.statusCode || 500).send(error.message);
        else res.sendStatus(res.statusCode || 500);
    }
    next();
}