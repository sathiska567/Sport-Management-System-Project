const eventTabModel = require("../../models/editEventTabModel/EditEventTab");

// const createevent = async (req, res) => {
//     try {

//         const data = new createModel(req.body)
//         await data.save()

//         res.send({
//             success: true,
//             message: "data save successfully",
//             data: data
//         })

//     } catch (error) {
//         res.status(400).send({
//             success: false,
//             message: 'Error While Getting Review',
//             error
//         })
//     }
// }


const geteventTab = async (req, res) => {
    try {

        const data = await eventTabModel.findOne(req.param.id)
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

const updateeventTab = async(req,res)=>{
   try{
    const{ _id,...rest} = req.body
   console.log(req.body);

   
     const data = await eventTabModel.updateOne({_id : _id},rest)
     res.send({success : true, message : "data update successfully", data : data})
   } catch (error) {
    res.status(400).send({
        success: false,
        message: 'Error While Getting Review',
        error
    })
   }
   
}


const deleteventTab = async (req, res) => {
    try {

        const { id } = req.body
        console.log(id);
        const deletedUser = await eventTabModel.findByIdAndDelete(id);
        res.send({ success: true, message: "data delete successfully", data: deletedUser })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}
module.exports = {geteventTab,updateeventTab,deleteventTab};