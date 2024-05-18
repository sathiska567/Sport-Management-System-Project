const mongoose = require('mongoose');

const EoProfileSchema = new mongoose.Schema({

     EoId:{
       type:String,

     },
     EoName:{
        type:String,
        required:["Event Organizer name is Required",true]
     },
     EoEmail:{
        type:String,
        required:["Event Organizer email is Required",true]
     },
     EoDateOfBirth:{
        type:Object,
        required:["Event Organizer Date Of Birth is Required",true]
     },
     EoAge:{
        type:Number,
        required:["Event Organizer age is Required",true]
     },


})

const EoProfileDetailsNewModel = mongoose.model('EoProfileDetailUpdated',EoProfileSchema);
module.exports = EoProfileDetailsNewModel;