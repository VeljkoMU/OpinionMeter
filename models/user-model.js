const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: String,
    password: String
}, {collection: "userdata"});

UserSchema.index({username: 1}, {unique: true});

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;