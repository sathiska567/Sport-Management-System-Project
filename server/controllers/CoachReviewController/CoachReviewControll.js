const reviewModel = require('../../models/CoachReviewModel/CoachReviewModel');

const coachReviewCreateController = async (req, res) => {
    const { battingReview, bowlingReview, fieldingReview, overallReview, comment, playerId, reviewGivenCoachId, reviewGivenCoachName, reviewGivenCoachEmail } = req.body;
    console.log(battingReview, bowlingReview, fieldingReview, overallReview, comment, playerId, reviewGivenCoachId, reviewGivenCoachName, reviewGivenCoachEmail);
    try {
        const data = new reviewModel({
            battingReview: battingReview,
            bowlingReview: bowlingReview,
            fieldingReview: fieldingReview,
            overallReview: overallReview,
            comment: comment,
            playerId: playerId,
            reviewGivenCoachId: reviewGivenCoachId,
            reviewGivenCoachName: reviewGivenCoachName,
            reviewGivenCoachEmail: reviewGivenCoachEmail
        })

        await data.save();

        res.status(200).send({
            success: true,
            message: 'Review Created Successfully',
            data
        })

    } catch (error) {

    }

}


const getOverrallReviewController = async (req, res) => {
    try {

        const { page } = req.body
        console.log(page);
        // Default to page 1 if not provided or invalid
        const pageNumber = parseInt(page, 10) || 1;

        // Define the limit per page
        const limit = 5;

        // Calculate the skip based on pageNumber and limit
        const skip = (pageNumber - 1) * limit;

        // Fetch the Fixtures with limit and skip
        const review = await reviewModel.find().limit(limit).skip(skip).exec();

        // Count total number of Fixtures
        const totalReview = await reviewModel.countDocuments();

        // const review = await reviewModel.find({})
        // console.log(review);

        if (!review) {
            return res.status(404).send({
                success: false,
                message: 'Not Found Any reviewa',
            })
        }

        res.status(200).send({
            success: true,
            message: "Review fetched successfully",
            data: {
                limit,
                review,
                totalReview,
                totalPages: Math.ceil(totalReview / limit),
                currentPage: pageNumber,
            },
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}


const searchReviewController = async (req, res) => {
    try {
        const { coachName } = req.body;
        console.log(coachName);

        // Case-insensitive regular expression for coach name
        const regex = new RegExp(coachName, 'i');

        // Find all users who are coaches and whose username matches the regex
        const data = await reviewModel.find({ reviewGivenCoachName: regex });

        res.status(200).send({
            success: true,
            message: '  Search Review Fetched Successfully',
            data:data
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}



// get all reviews
const getOverrallReviewWithoutPaginationController = async(req,res)=>{
  try {
    const review = await reviewModel.find({});
    

    res.status(200).send({
        success: true,
        message: 'Review Fetched Successfully',
        data:review
    })
    
  } catch (error) {
     res.status(400).send({
        success: false,
        message: 'Error While Getting Review',
        error
     })
  }
}

module.exports = { coachReviewCreateController, getOverrallReviewController, searchReviewController,getOverrallReviewWithoutPaginationController };