const mongoose = require('mongoose');

async function connectMongoDb(){
    mongoose.connect("mongodb://127.0.0.1:27017/evntstaffassign2");

}
module.exports = {
  connectMongoDb,  
};