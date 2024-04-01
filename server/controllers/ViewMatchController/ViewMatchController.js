const matchDetailsModel = require('../../models/ViewMatchModel/ViewMatchModel');

const createMatchDetails = async (req, res) => {
    try {

        const data = new matchDetailsModel(req.body)

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


const getMatchDetails = async (req, res) => {
    try {
        let data = matchDetailsModel.find({})

        if (!data) return res.json({ success: false, data: [] })

        // search 
        if (req.query) {
            const query = req.query;

            if (query.q) {
                const q = query.q;
                data.find({name : { $regex: q, $options: "i"}});
            }

            if (query.date) {
                const date = query.date;
                data.find({date: { $regex: date, $options: "i"}});
            }
        }

        try {
            data = await data.exec();
            res.json({
                success: true,
                data: data
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error While Getting Review',
                error
            })
        }
       

    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}





module.exports = { createMatchDetails, getMatchDetails };