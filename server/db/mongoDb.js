const mongoose = require("mongoose")

const Mongo_url = process.env.MONGO_URL


 //console.log(typeof Mongo_url);

mongoose.connect('mongodb+srv://ravishan:Pass123@cluster0.zmi2r0z.mongodb.net/userModel');

const connection = mongoose.connection;


connection.once("open",()=>{
    console.log("monogdb connected");
})