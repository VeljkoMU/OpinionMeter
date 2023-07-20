const UserModel = require("../models/user-model.js");
const md5 = require("md5");
const PostModel = require("../models/post-model.js");

class UserDataController {
    
    constructor() {

    }

    async registerUser(user, onSuccess, onError, onUsernameTaken) {
        UserModel.find({username: user.username}, (err, docs)=>{
            console.log(docs);
            if(docs.length!=0){
                onUsernameTaken();
                return;
            }
    
            UserModel.create({
                username: user.username,
                password: md5(user.password),
                gender: user.gender,
                education: user.edu,
                employment: user.emp,
                region: user.region
            }).then(()=>{
                onSuccess()
            })
            .catch((err)=>{
                onError(err)
            })
        });
    }

    async login(username, password, onSuccess, onUnauthorized, onNotfound) {
        UserModel.findOne({username: username}, (err, doc)=>{
            if(doc === null){
                onNotfound();
                return;
            }
    
            if(doc.password==md5(password)){
                onSuccess();
            }
            else 
            onUnauthorized();
        });
    }

    getUser(username, onSuccess, onError) {
        UserModel.findOne({username: username}, (err, data) => {
            if(err || !data) {
                onError()
            }
            else {
                onSuccess(data._doc)
            }
        })
    }

    deleteUser(username, onSuccess, onError) {
        UserModel.deleteOne({username: username}, (err) => {
            if(err) {
                onError(500);
                return;
            }

            onSuccess();
        })
    }
}

module.exports = UserDataController;