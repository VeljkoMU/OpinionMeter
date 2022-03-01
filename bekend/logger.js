const LogDataModel = require("./models/log-data");

function logger(req, res, next){
    let log = new LogDataModel();

    log.headers = req.headers;
    log.ip = req.ip;
    log.time = Date.now();
    log.createdAt = new Date(Date.now().valueOf());

    console.log(log);

    log.save();

    next();
}

module.exports = logger;