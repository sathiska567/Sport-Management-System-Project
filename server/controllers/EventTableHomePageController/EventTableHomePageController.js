const createEventModel = require("../../models/CreateEventModel/createEventModel")




const getEventHomePage = async (req, res) => {
    try {

        const data = await createEventModel.find({})
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




module.exports = { getEventHomePage };