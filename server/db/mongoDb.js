const mongoose = require("mongoose")

const Mongo_url = process.env.MONGO_URL


// console.log(Mongo_url);

mongoose.connect(Mongo_url);

const connection = mongoose.connection;


connection.once("open",()=>{
    console.log("monogdb connected");
})