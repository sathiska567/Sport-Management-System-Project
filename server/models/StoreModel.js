const mongoose = require('mongoose');

const storeModelSchema = new mongoose.Schema({
        singleEliminateModel: {
                type: [String],
                default: [],
        },
})


const storeFixture = mongoose.model('storeFixture', storeModelSchema);

module.exports = storeFixture; //export the model 