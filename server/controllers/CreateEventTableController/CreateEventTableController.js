
const createModel = require("../../models/CreateEventTableModel/createEventTableModel");

const createeventform = async (req, res) => {
    try {

        const data = new createModel(req.body)
        await data.save()

        res.send({
            success: true,
            message: "data save successfully",
            data: data
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}


const geteventform = async (req, res) => {
    try {

        const data = await createModel.find({})
        res.json({
            success: true,
            data: data
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}

const updateeventform = async(req,res)=>{
   try{
    const{ _id,...rest} = req.body
   console.log(req.body);

   
     const data = await createModel.updateOne({_id : _id},rest)
     res.send({success : true, message : "data update successfully", data : data})
   } catch (error) {
    res.status(400).send({
        success: false,
        message: 'Error While Getting Review',
        error
    })
   }
   
}


const deleteeventform = async (req, res) => {
    try {

        const { id } = req.body
        console.log(id);
        const deletedUser = await createModel.findByIdAndDelete(id);
        res.send({ success: true, message: "data delete successfully", data: deletedUser })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}
module.exports = {createeventform,geteventform,updateeventform,deleteeventform};