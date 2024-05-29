const assignModel = require("../../models/CoachesAssignDeleteModel/CoachesAssignDeleteModel");
const createEventModel = require("../../models/CreateEventModel/createEventModel");

const createcoachesAssign = async (req, res) => {
  try {
    const data = new assignModel(req.body);

    await data.save();

    res.send({
      success: true,
      message: "data save successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Getting Review",
      error,
    });
  }
};

const getCoaches = async (req, res) => {
  try {
    let data = await assignModel.find({});
    const eventData = await createEventModel.find({});
    const final = [];

    data = data.map((item) => {
      if (item.assignedEvents) {
        return item;
      }
      return { ...item, assignedEvents: [] };
    });

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < eventData.length; j++) {
        final.push({
          coachId: data[i]._id,
          eventId: eventData[j].id,
          coachName: data[i].name,
          eventName: eventData[j].nameOfTheEvent,
          status: data[i].assignedEvents.includes(eventData[j]._id),
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

const changeCoachesStatus = async (req, res) => {
  try {
    const { eventId, coachId, task } = req.body;
    // console.log(eventId);
    // console.log("Task:", task);
    // const id = req.params.id
    // const status = req.params.status

    const old = await assignModel.findById(coachId);

    // console.log("Old:", old);

    let data;

    if (task === "assign") {
      data = await assignModel.findByIdAndUpdate(
        { _id: coachId },
        { assignedEvents: [eventId, ...old.assignedEvents] },
        { new: true }
      );
    } else {
      const newList = old.assignedEvents.filter((item) => item !== eventId);
      data = await assignModel.findByIdAndUpdate(
        { _id: coachId },
        { assignedEvents: newList },
        { new: true }
      );
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

const deleteCoachesStatus = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const deletedUser = await assignModel.findByIdAndDelete(id);
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
  createcoachesAssign,
  getCoaches,
  changeCoachesStatus,
  deleteCoachesStatus,
};
