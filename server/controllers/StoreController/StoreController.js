
const storeModel = require('../../models/StoreModel/StoreModel')

const storeSingleEliminareController = async(req,res)=>{
    try {

        const newArray = req.body;
        console.log(newArray);
        
    } catch (error) {
        res.status(400).send({
                success:false,
                message:"Store single eliminare controller error",
                error
        })
    }
}


module.exports = {storeSingleEliminareController}