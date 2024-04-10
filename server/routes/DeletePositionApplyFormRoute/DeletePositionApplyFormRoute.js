const express = require('express');
const { DeletePositionApplyFormController } = require('../../controllers/DeletePositionApplyFormController/DeletePositionApplyFormControll');


const router = express.Router();

router("/data",DeletePositionApplyFormController)


module.exports = router;