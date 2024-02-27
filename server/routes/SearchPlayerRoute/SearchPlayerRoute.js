const express = require("express")
const { SearchPlayerController } = require("../../controllers/SearchPlayerController/SearchPlayerController")

const router = express.Router()


router.post("/search-player-location",SearchPlayerController)


module.exports = router