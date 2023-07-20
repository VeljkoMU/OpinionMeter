
const mongoose= require("mongoose");

const connString = "X";

async function initMongoDBConnection() {
    await mongoose.connect(connString).then(()=>{
        console.log("Connected to the database successfuly.")
    })
    .catch((err)=> {
        console.log(err)
    })
}

module.exports = initMongoDBConnection