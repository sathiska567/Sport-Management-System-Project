const assignModel = require("../../models/AssignCoachesNewModel/AssignCoachesNewModel");
const createEventModel = require("../../models/CreateEventModel/createEventModel");
const User = require("../../models/userModel");



const getAssignCoaches = async (req, res) => {


  try {
    let data = await User.find({ isCoach: true });
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
      const assignedData = await assignModel.find({ _id: data[i]._id });
      // console.log(assignedData);
      for (let j = 0; j < eventData.length; j++) {
        final.push({
          coachId: data[i]._id,
          eventId: eventData[j].id,
          coachName: data[i].username,
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
  } 
  
  catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Getting Review",
      error,
    });
  }
};




const changeAssignCoachesStatus = async (req, res) => {


  try {
    const { eventId, coachId, task } = req.body;
    // console.log(eventId);
    // console.log("Task:", task);
    // const id = req.params.id
    // const status = req.params.status

    const old = await assignModel.findById(coachId);

    // console.log("Old:", old);

    let data;

    if (old) {
      if (task === "assign") {
        data = await assignModel.findByIdAndUpdate(
          { _id: coachId },
          { assignedEvents: [eventId, ...old.assignedEvents] },
          { new: true }
        );
      }
      
      else {
        const newList = old.assignedEvents.filter((item) => item !== eventId);
        data = await assignModel.findByIdAndUpdate(
          { _id: coachId },
          { assignedEvents: newList },
          { new: true }
        );
      }
    } 
    
    else {
      data = new assignModel({
        _id: coachId,
        assignedEvents: [eventId],
      });
    }

    data.save();

    res.status(200).json({ success: true });

    console.log(data);
  }
  
  catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Getting Review",
      error,
    });
  }
};




const deleteAssignCoachesStatus = async (req, res) => {

  try {
    const { id } = req.body;
    console.log(id);
    const deletedUser = await assignModel.findByIdAndDelete(id);
    res.send({
      success: true,
      message: "data delete successfully",
      data: deletedUser,
    });
  } 
  
  catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Getting Review",
      error,
    });
  }
};



module.exports = {
  
    getAssignCoaches,
    changeAssignCoachesStatus,
    deleteAssignCoachesStatus,
};