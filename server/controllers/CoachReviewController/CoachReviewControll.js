const reviewModel = require('../../models/CoachReviewModel/CoachReviewModel');

const coachReviewCreateController = async (req, res) => {
    const { battingReview, bowlingReview, fieldingReview, overallReview, comment, playerId,reviewGivenCoachId,reviewGivenCoachName,reviewGivenCoachEmail } = req.body;
    console.log(battingReview, bowlingReview, fieldingReview, overallReview, comment, playerId,reviewGivenCoachId,reviewGivenCoachName,reviewGivenCoachEmail );
    try {
        const data = new reviewModel({
            battingReview: battingReview,
            bowlingReview: bowlingReview,
            fieldingReview: fieldingReview,
            overallReview: overallReview,
            comment: comment,
            playerId: playerId,
            reviewGivenCoachId:reviewGivenCoachId,
            reviewGivenCoachName:reviewGivenCoachName,
            reviewGivenCoachEmail:reviewGivenCoachEmail
        })

        await data.save();

        res.status(200).send({
            success:true,
            message:'Review Created Successfully',
            data
        })

    } catch (error) {

    }

}


const getOverrallReviewController = async(req,res)=>{
   try {

    const review = await reviewModel.find({})
    console.log(review);

    if(!review){
        return res.status(404).send({
            success:false,
            message:'Not Found Any reviewa',
          })
    }

    res.status(200).send({
        success:true,
        message:'Review Found',
        review
      })
    
   } catch (error) {
      res.status(400).send({
        success:false,
        message:'Error While Getting Review',
        error
      })
   }
}


module.exports = { coachReviewCreateController,getOverrallReviewController };