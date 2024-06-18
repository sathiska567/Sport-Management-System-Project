const Match = require('../../models/CreateEventModel/createEventModel')




const getEventAssignPlayers = async (req, res) => {
    try {
        let data = Match .find({})

        if (!data) return res.json({ success: false, data: [] })

        // search 
        if (req.query) {
            const query = req.query;

            if (query.q) {
                const q = query.q;
                data.find({nameOfTheEvent: { $regex: q, $options: "i"}});
            }

            if (query.date) {
                const date = query.date;
                data.find({eventDate: { $regex: date, $options: "i"}});
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

const getSingleEvent =  async (req, res) => {
    try {
        const { _id } = req.params;

        const data = await Match.findById({ _id });
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




module.exports = { getEventAssignPlayers,getSingleEvent };