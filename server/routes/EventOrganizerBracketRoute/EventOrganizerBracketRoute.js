const express = require('express');
const { getWinners, setWinners, createRound, getTeamController} = require('../../controllers/EventOrganizerBracketController/EventOrganizerBracketController');
const router = express.Router()


// router.get('/create-round/:matchId/:roundNo', createRound);

// //router.post('/brackets', setBrackets);


// router.get('/getWinners/:matchId', getWinners);

// router.post('/setWinners/:matchId/:roundNo', setWinners);

router.get("/getTeams",getTeamController)



module.exports = router