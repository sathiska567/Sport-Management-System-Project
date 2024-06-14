const createFixtureModel = require("../../models/CreateFixtureModel/CreateFixtureModel")

const FixtureSearchController = async (req, res) => {
        try {
          console.log(req.body);
          const finalArray = [];
      
          const searchValue = req.body.value;
          const searchDate = req.body.searchDate;
      
          let query = {};
      
          if (searchValue) {
            const regex = new RegExp(searchValue, 'i'); // 'i' makes the search case-insensitive
            query.location = regex;
          }
      
          if (searchDate) {
            const searchDateObj = new Date(searchDate);
            const normalizedSearchDate = searchDateObj.toISOString().split('T')[0];
            query.eventNewDate = normalizedSearchDate;
          }
      
          const data = await createFixtureModel.find(query);
      
          // If searchDate is provided, further filter the data
          if (searchDate) {
            const searchDateObj = new Date(searchDate);
            const normalizedSearchDate = searchDateObj.toISOString().split('T')[0];
      
            for (let i = 0; i < data.length; i++) {
              const eventDate = new Date(data[i].eventNewDate);
              const normalizedEventDate = eventDate.toISOString().split('T')[0];
      
              if (normalizedEventDate === normalizedSearchDate) {
                finalArray.push(data[i]);
              }
            }
          } else {
            finalArray.push(...data);
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