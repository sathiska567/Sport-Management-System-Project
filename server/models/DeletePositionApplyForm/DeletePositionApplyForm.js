const mongoose = require('mongoose');


const DeletePositionApplyFormSchema = new mongoose.Schema({
        id:{
          type: String,
        //   required: true,
        }
})


const deletePosition = new mongoose.model("deletePosition", DeletePositionApplyFormSchema);

module.exports = {deletePosition}