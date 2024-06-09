const express = require('express');
const { getMatches, getPlayers, createMatch, createTeam, editTeam, getTeams, deleteTeam, getPlayersTeamUpdate } = require('../controllers/coachController');
const router = express.Router()


router.get('/matches', getMatches)

router.get('/players', getPlayers)

router.post('/create-match', createMatch)

router.post('/create-team', createTeam)


router.get('/teams', getTeams)
//router.get('/edit-team', getPlayersTeamUpdate )
router.post('/update-team', editTeam)
router.delete('/delete-team', deleteTeam)



module.exports = router;