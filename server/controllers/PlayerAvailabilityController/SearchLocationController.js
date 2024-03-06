const createEventModel = require("../../models/CreateEventModel/createEventModel");

const searchLocationController = async (req, res) => {
        console.log(req.body.value.length);
        const searchTerm = req.body.value;

        // console.log(location);

        // try {
        //         if (req.body.value.length == 0) {
        //                 const data = await createEventModel.find({});
        //                 // console.log(data);

        //                 if (!data) {
        //                         return res.status(404).send({
        //                                 message: "No data found",
        //                                 success: false
        //                         })
        //                 }

        //                 res.status(200).send({
        //                         message: "Data found",
        //                         success: true,
        //                         data: data
        //                 })
        //         }
        //         else {

        //           const data = await createEventModel.find({ location: req.body.value });
        //            console.log(data); 

        //            if (!data) {
        //                 return res.status(404).send({
        //                         message: "No data found",
        //                         success: false
        //                 })
        //         }

        //         res.status(200).send({
        //                 message: "Data found",
        //                 success: true,
        //                 data: data
        //         })
        //         }




        // } catch (error) {
        //         res.status(200).send({
        //                 message: "Error Occure in Searching Data",
        //                 success: false,
        //                 error: error
        //         })
        // }


        try {

                // Use a regular expression for a case-insensitive search
                const regex = new RegExp(searchTerm, 'i');

                console.log(regex);

                // Replace 'location' with the actual field you want to search on
                const data = await createEventModel.find({ location: { $regex: regex } });

                console.log(data);

                        res.status(200).send({
                                message: "Data found",
                                success: true,
                                data: data
                        })



        } catch (error) {
                res.status(200).send({
                        message: "Error Occure in Searching Data",
                        success: false,
                        error: error
                })
        }

}


module.exports = { searchLocationController }