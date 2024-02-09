const reviewModel = require('../../models/ReviewModel/ReviewModel');

const reviewController = async(req,res)=>{
 try {

   const {review} = req.body;

 } catch (error) {
     res.status(400).send({
        success:false,
        message:"Error in adding review",
     })   
 }

}


module.exports = {reviewController};