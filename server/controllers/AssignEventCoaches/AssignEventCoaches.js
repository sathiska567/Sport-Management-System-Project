const assignEventModel = require('../../models/AssignEventCoaches/AssignEventCoaches');

const assignEventCoaches = async (req, res) => {
    try {

        const data = new assignEventModel(req.body)
        
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


const getEventCoaches = async (req, res) => {
    try {

        const data = await assignEventModel.find({})
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





module.exports = { assignEventCoaches,getEventCoaches};