const express = require('express')
const { searchLocationController } = require('../../controllers/PlayerAvailabilityController/SearchLocationController')

const router = express.Router()


router.post("/search-location",searchLocationController)


module.exports = router;