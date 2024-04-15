const assignEventMemberModel = require('../../models/EventViewNewModel/EventViewNewModel');


// create event data
const assignEventCoachesAndPlayers = async (req, res) => {
    try {

        const data = new assignEventMemberModel(req.body)

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

// get event data

const getEventCoachesAndPlayers = async (req, res) => {
    try {
        let data = assignEventMemberModel.find({})

        if (!data) return res.json({ success: false, data: [] })

        // search  team name and date
        if (req.query) {
            const query = req.query;
            console.log(query);

            if (query.q) {
                const q = query.q;
                data.find({ teamname : { $regex: q, $options: "i"}});
            }

            if (query.date) {
                const evedate = query.date;
                data.find({evedate: { $regex: evedate, $options: "i"}});
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





module.exports = { assignEventCoachesAndPlayers,getEventCoachesAndPlayers };