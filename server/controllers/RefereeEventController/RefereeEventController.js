const RefereeEventModel = require("../../models/RefereeEventModel/RefereeEventModel");

const createRefereeEvent = async (req, res) => {
  try {
    const data = new RefereeEventModel(req.body);

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

const getRefereeEvents = async (req, res) => {
  try {
    let data = await RefereeEventModel.find({});
    res.status(200).send({
      success: true,
      message: "data get successfully",
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

const getRefereeEvent = async (req, res) => {
  try {
    const data = await RefereeEventModel.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "data get successfully",
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

const updateRefereeEvent = async (req, res) => {
  try {
    const data = await RefereeEventModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "data updated successfully",
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

const deleteRefereeEvent = async (req, res) => {
  try {
    const data = await RefereeEventModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "data delete successfully",
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

module.exports = {
  createRefereeEvent,
  getRefereeEvent,
  getRefereeEvents,
  updateRefereeEvent,
  deleteRefereeEvent,
};