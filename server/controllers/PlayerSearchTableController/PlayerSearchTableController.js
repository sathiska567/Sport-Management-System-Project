const playerSearchTableModel = require('../../models/userModel');




const  getSearchPlayerTable = async (req, res) => { 
    try {
        let data = playerSearchTableModel.find({})

        if (!data) return res.json({ success: false, data: [] })

        // search 
        if (req.query) {
            const query = req.query;

            if (query.q) {
                const q = query.q;
                data.find({ email : { $regex: q, $options: "i"}});
            }
            
            if (query.role) {
                const role = query.role;
                if (role === "player") {
                    console.log(role)
                    data.find({isPlayer: true});
                }
                else if (role ===  "coach")
                    data.find({isCoach: true})
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





module.exports = { getSearchPlayerTable };