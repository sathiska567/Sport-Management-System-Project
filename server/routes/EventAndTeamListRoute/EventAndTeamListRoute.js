const express = require('express');
const { GetEventsForPointTable,GetTeamsByEventName } = require('../../controllers/EventAndTeamListController/EventAndTeamListController');

const router = express.Router();

//Get events 
router.get('/eventsandTeams', GetEventsForPointTable);

//Get Teams
router.get('/eventTeams/:eventName', GetTeamsByEventName);

module.exports = router;