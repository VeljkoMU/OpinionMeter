const mongoose = require('mongoose');


const LogDataSchema = mongoose.Schema({
    headers: Object,
    ip: String,
    time: Number,
    createAt: {type: Date, expires: '30s'}
}, {collection: 'logdata'});


const LogDataModel = mongoose.model("LogDataModel", LogDataSchema);

module.exports = LogDataModel;

