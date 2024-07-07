const PointTableFormModel = require("../../models/PointTableFormModel/PointTableFormModel");

const PointTableForm = async (req, res) => {
  try {
    const {
      nameOfTheMatch,
      nameOfTheTeam,
      wonMatches,
      lostMatches,
      totalRunsEachTeamMatches,
      totalOversEachTeam,
      totalMarksForEachTeam,
    } = req.body;

    const data = new PointTableFormModel({
      nameOfTheMatch,
      nameOfTheTeam,
      wonMatches,
      lostMatches,
      totalRunsEachTeamMatches,
      totalOversEachTeam,
      totalMarksForEachTeam,
    });

    await data.save();

    res.status(200).send({
      success: true,
      message: "Event Created Successfully",
      data,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to create event details",
      error,
    });
  }
};

module.exports = { PointTableForm };