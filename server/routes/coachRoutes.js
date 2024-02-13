const express = require('express');
const { getMatches, getPlayers, createMatch, createTeam } = require('../controllers/coachController');
const router = express.Router()


router.get('/matches', getMatches)

router.get('/players', getPlayers)

router.post('/create-match', createMatch)

router.post('/create-team', createTeam)



module.exports = router;