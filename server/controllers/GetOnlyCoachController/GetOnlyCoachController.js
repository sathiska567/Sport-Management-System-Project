const User = require("../../models/userModel")
const CoachAvailability = require("../../models/CoachAvailabilityModel/CoachAvailabilityModel")

const GetOnlyCoachController = async (req, res) => {
  try {
    const data = await User.find({});
    const coach = []

    const dataLength = data.length;

    for (let i = 0; i < dataLength; i++) {
      if (data[i].isCoach) {
        coach.push(data[i])
      }

    }

    // console.log(dataLength);

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: coach,
    })

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    })
  }
}


// get event available coacehs
const GetEventAvailableCoachesController = async (req, res) => {
  try {
    const { eventId } = req.body;
    const availableCoachDetails = [];

    // Find coach availability for the given event ID
    const availability = await CoachAvailability.find({
      eventId: eventId,
      availability: true,
    });

    // Extract the coach IDs from the availability records
    const availableCoachIds = availability.map((item) => item.coachId);

    // Find details of the coaches who are available and are coaches
    const coachDetails = await User.find({
      _id: { $in: availableCoachIds },
      isCoach: true,
    });

    // Collect the relevant details of the available coaches
    coachDetails.forEach((coach) => {
      availableCoachDetails.push({
        id: coach._id,
        username: coach.username,
        email: coach.email,
      });
    });

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: availableCoachDetails,
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// paginations
const GetOnlyCoachesPaginationController = async (req, res) => {
  try {
    const { page } = req.body;
    const data = await User.find({ isCoach: true });

    // Default to page 1 if not provided or invalid
    const pageNumber = parseInt(page, 10) || 1;

    // Define the limit per page
    const limit =5;

    // Calculate the skip based on pageNumber and limit
    const skip = (pageNumber - 1) * limit;

    // Get the coaches for the current page
    const paginatedCoaches = data.slice(skip, skip + limit);

    // Total number of coaches
    const totalCoaches = data.length;

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: {
        limit,
        coaches: paginatedCoaches,
        totalCoaches,
        totalPages: Math.ceil(totalCoaches / limit),
        currentPage: pageNumber,
      },
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};


module.exports = { GetOnlyCoachController, GetEventAvailableCoachesController, GetOnlyCoachesPaginationController };