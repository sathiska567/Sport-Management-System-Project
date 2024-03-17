const assignModel = require('../../models/CoachesAssignDeleteModel/CoachesAssignDeleteModel');

const createcoachesAssign = async (req, res) => {
    try {

        const data = new assignModel(req.body)
        
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


const getCoaches = async (req, res) => {
    try {

        const data = await assignModel.find({})
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

const changeCoachesStatus = async (req, res) => {
    try {

        const { id } = req.body
        console.log(id);
        // const id = req.params.id
        // const status = req.params.status
        
        const data = await assignModel.findByIdAndUpdate(
            { _id: id },
            { status: true },
            { new: true }
        );

        data.save();

        res.status(200).json({ success: true })

        console.log(data);

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}

const deleteCoachesStatus = async (req, res) => {
    try {

        const { id } = req.body
        console.log(id);
        const deletedUser = await assignModel.findByIdAndDelete(id);
        res.send({ success: true, message: "data delete successfully", data: deletedUser })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}

module.exports = { createcoachesAssign,getCoaches,changeCoachesStatus,deleteCoachesStatus };