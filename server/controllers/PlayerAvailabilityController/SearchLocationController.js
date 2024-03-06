const createEventModel = require("../../models/CreateEventModel/createEventModel");

const searchLocationController = async (req, res) => {
        console.log(req.body.value.length);

        try {
                if (req.body.value.length == 0) {
                        const data = await createEventModel.find({});
                        // console.log(data);

                        if (!data) {
                                return res.status(404).send({
                                        message: "No data found",
                                        success: false
                                })
                        }
        
                        res.status(200).send({
                                message: "Data found",
                                success: true,
                                data: data
                        })
                }
                else {

                  const data = await createEventModel.find({ location: req.body.value });
                   console.log(data); 
                   
                   if (!data) {
                        return res.status(404).send({
                                message: "No data found",
                                success: false
                        })
                }

                res.status(200).send({
                        message: "Data found",
                        success: true,
                        data: data
                })
                }


               

        } catch (error) {
                res.status(200).send({
                        message: "Error Occure in Searching Data",
                        success: false,
                        error: error
                })
        }

}


module.exports = { searchLocationController }