const assignPlayerModel = require("../../models/AssignedPlayersTableModel/AssignedPlayersTableModel");
const createEventModel = require("../../models/CreateEventModel/createEventModel");
const User = require("../../models/userModel");



const getAssignPlayers = async (req, res) => {
  try {
    let data = await User.find({ isPlayer: true });
    // console.log(data);
    const eventData = await createEventModel.find({});
    const final = [];

    // data = data.map((item) => {
    //   if (item.assignedEvents) {
    //     return item;
    //   }
    //   return { ...item, assignedEvents: [] };
    // });

    for (let i = 0; i < data.length; i++) {
      const assignedData = await assignPlayerModel.find({ _id: data[i]._id });
      // console.log(assignedData);
      for (let j = 0; j < eventData.length; j++) {
        final.push({
          playerId: data[i]._id,
          eventId: eventData[j].id,
          playerName: data[i].username,
          eventName: eventData[j].nameOfTheEvent,
          status:
            assignedData.length > 0
              ? assignedData[0].assignedEvents.includes(eventData[j]._id)
              : false,
        });
      }
    }

    res.status(200).send({
      success: true,
      message: "data get successfully",
      data: final,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Getting Review",
      error,
    });
  }
};


//chage status asiign button

const changeAssignPlayersStatus = async (req, res) => {
  try {
    const { eventId, playerId, task } = req.body;
    // console.log(eventId);
    // console.log("Task:", task);
    // const id = req.params.id
    // const status = req.params.status

    const old = await assignPlayerModel.findById(playerId);

    // console.log("Old:", old);

    let data;

    if (old) {
      if (task === "assign") {
        data = await assignPlayerModel.findByIdAndUpdate(
          { _id: playerId },
          { assignedEvents: [eventId, ...old.assignedEvents] },
          { new: true }
        );
      } 
      else {
        const newList = old.assignedEvents.filter((item) => item !== eventId);
        data = await assignPlayerModel.findByIdAndUpdate(
          { _id: playerId },
          { assignedEvents: newList },
          { new: true }
        );
      }
    } 
    else {
      data = new assignPlayerModel({
        _id: playerId,
        assignedEvents: [eventId],
      });
    }

    data.save();

    res.status(200).json({ success: true });

    console.log(data);
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Getting Review",
      error,
    });
  }
};




//delete button


const deleteAssignPlayersStatus = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const deletedUser = await assignPlayerModel.findByIdAndDelete(id);
    res.send({
      success: true,
      message: "data delete successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Getting Review",
      error,
    });
  }
};




module.exports = {
  
    getAssignPlayers,
    changeAssignPlayersStatus,
    deleteAssignPlayersStatus,
};