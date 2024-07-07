const CreateFixtureModel = require("../../models/CreateFixtureModel/CreateFixtureModel");

// Get all events
const GetEventsForPointTable = async (req, res) => {
  try {
    const events = await CreateFixtureModel.find();
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// Get teams by event name
const GetTeamsByEventName = async (req, res) => {
    
  try {
    const { eventName } = req.params;
    const event = await CreateFixtureModel.findOne({ nameOfTheEvent:eventName }).populate('teams');
    if (event) {
      res.status(200).json({ success: true, data: event.nameOfTheTeam });
    } else {
      res.status(404).json({ success: false, message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  } 
};

module.exports = {
  GetEventsForPointTable,
  GetTeamsByEventName,
};