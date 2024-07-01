const reviewModel = require('../../models/CoachReviewModel/CoachReviewModel');
const playerModel = require('../../models/userModel')

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


const getReviewWithSortingController = async (req, res) => {
    try {
      const playerWithReview = [];
      const players = await playerModel.find({ isPlayer: true });
      const playerReview = await reviewModel.find({});
    
      // Create a map to store cumulative overall review for each player
      // A Map is useful when you need to associate values with keys and the keys can be of any type.
      const playerFinalOverallReview = new Map();
    
      // Iterate over players
      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        let totalOverallReview = 0;
        let count = 0; // Initialize count of reviews for averaging
    
        // Iterate over reviews to aggregate overallReview for the current player
        for (let j = 0; j < playerReview.length; j++) {
          if (player._id.equals(playerReview[j].playerId)) {
            totalOverallReview += playerReview[j].overallReview;
            count++; // Increment count for averaging
          }
        }
    
        // Calculate average overall review if there are reviews for the player
        if (count > 0) {
          const averageOverallReview = totalOverallReview / count;
          // Store player with their average overall review in the map
          playerFinalOverallReview.set(player._id.toString(), {
            player,
            overallReview: averageOverallReview
          });
        }

        else{
            playerFinalOverallReview.set(player._id.toString(), {
                player,
                overallReview: 0
              });
        }
      }
    
      // Push entries from map to playerWithReview array
      playerFinalOverallReview.forEach(entry => {
        playerWithReview.push(entry);
      });

    //   b.overallReview is greater than a.overallReview, b should come before a
      playerWithReview.sort((a, b) => b.overallReview - a.overallReview);
    
      res.status(200).send({
        success: true,
        message: 'Review Fetched Successfully',
        data: playerWithReview
      });
    
    } catch (error) {
      res.status(400).send({
        success: false,
        message: 'Error While Getting Review',
        error
      });
    }
  };
  
  
  

module.exports = { coachReviewCreateController, getOverrallReviewController, searchReviewController,getOverrallReviewWithoutPaginationController,getReviewWithSortingController };