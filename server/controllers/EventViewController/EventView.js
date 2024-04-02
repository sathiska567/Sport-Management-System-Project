const assignEventModel = require('../../models/EventViewModel/EventView');

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
        let data = assignEventModel.find({})

        if (!data) return res.json({ success: false, data: [] })

        // search 
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





module.exports = { assignEventCoaches, getEventCoaches };