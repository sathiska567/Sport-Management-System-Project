const express = require('express');
const { getWinners, setWinners, createRound, getMatches, } = require('../controllers/organizerController');
const router = express.Router()


router.get('/matches', getMatches)

router.get('/create-round/:matchId/:roundNo', createRound);

//router.post('/brackets', setBrackets);


router.get('/getWinners/:matchId', getWinners);

router.post('/setWinners/:matchId/:roundNo', setWinners);



module.exports = router