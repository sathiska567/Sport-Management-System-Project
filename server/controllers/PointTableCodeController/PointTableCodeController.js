
const PointTableFormModel = require("../../models/PointTableFormModel/PointTableFormModel");





const getPointTable = async (req, res) => {

    
    try {
        let data = PointTableFormModel.find({})



        if (!data) return res.json({ success: false, data: [] })



        // search  bar
        if (req.query) {
            const query = req.query;

            if (query.q) {


                const q = query.q;
                data.find({ nameOfTheTeam: { $regex: q, $options: "i"}});
            }

           
        }




        try {
            data = await data.exec();

            data = data.map((r) => {


                r = r._doc;
                const nrr = ((r.totalRunsEachTeamMatches / r.totalOversEachTeam) - (
                    r.totalMarksForEachTeam / r.totalOversEachTeam
                )).toFixed(2);

                return {...r, nrr};
            })


            
            res.json({
                success: true,
                data: data
            })
        }
        




        catch (error) {


            res.status(400).json({

                success: false,
                message: 'Error While Getting Review',
                error
            })
        }
       

    } 


    
    catch (error) {

        res.status(400).send({
            success: false,
            message: 'Error While Getting Review',
            error
        })
    }
}




module.exports = { getPointTable };