const mongoose = require('mongoose')


const schemaData = mongoose.Schema({
    name : String,
    location : String,
    teams : Number,
    date : String,
    time: String,
},{
    timestamps : true
})

const userModel = mongoose.model("form",schemaData)

module.exports = userModel;