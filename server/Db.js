const mongoose = require('mongoose')

const MongoURI = "mongodb://127.0.0.1/Register";

const ConnectDb = async() => {
    try {
        await mongoose.connect(MongoURI)
        console.log("Connected to dataBase");

    } catch (error) {
        console.log("Connection error", error);
        
    }

}

module.exports = ConnectDb