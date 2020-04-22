
function logger(req, res, next) {
    console.log(req.hostname)
    next();
}

module.exports.logger = logger;