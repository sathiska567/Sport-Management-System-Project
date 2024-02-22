const mongoose = require('mongoose');

//schema
const schemaData = mongoose.Schema({
    sid : String,
    name : String,
    location : String,
    status:{
       type:Boolean,
       default:false
    }
},{
    timestamps : true
})

const userModel = mongoose.model("user",schemaData )
module.exports = userModel;