const DeletePositionApplyForm = require("../../models/DeletePositionApplyForm/DeletePositionApplyForm")


const DeletePositionApplyFormController = async (req,res) => {
        try {
               console.log(req.body); 
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Error in Delete Position Apply Form",
                error,
            })     
        }
}


module.exports = {DeletePositionApplyFormController}