const createFixtureModel = require("../../models/CreateFixtureModel/CreateFixtureModel")

const FixtureSearchController = async (req, res) => {
        try {
          console.log(req.body);
          const finalArray = [];
          
          const searchValue = req.body.value;
        //   const searchDate = new Date(req.body.searchDate); // Convert searchDate to a Date object

          const regex = new RegExp(searchValue,'i'); // 'i' makes the search case-insensitive
        //   const regexDate = new RegExp(searchDate,'i'); // 'i' makes the search case-insensitive
      
          const data = await createFixtureModel.find({ location: regex});

          for (let i = 0; i < data.length; i++) {
             const eventDate = new Date(data[i].eventNewDate);

             if(data[i].eventNewDate == req.body.searchDate){
                 finalArray.push(data[i]);
             }
               
          }
      
          res.status(200).send({
            success: true,
            message: "Data Search Successfully",
            data: finalArray
          });
      
        } catch (error) {
          res.status(400).send({
            success: false,
            message: "Error in FixtureSearchController",
            error: error.message
          });
        }
      };
      

module.exports = {FixtureSearchController}