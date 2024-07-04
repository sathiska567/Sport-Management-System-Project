const playerModel = require("../../models/playerModel")

const GetPlayerCatagoryController = async (req, res) => {
  try {
    const getAllPlayerCategory = await playerModel.find({ status: 'Approve' });
    
    const { bowlerArray, battingArray, allRounderArray, wicketKeeperArray } = getAllPlayerCategory.reduce((acc, player) => {
      switch (player.catagory) {
        case 'Bowler':
          acc.bowlerArray.push(player);
          break;
        case 'Batsman':
          acc.battingArray.push(player);
          break;
        case 'All Rounder':
          acc.allRounderArray.push(player);
          break;
        case 'Keeper':
          acc.wicketKeeperArray.push(player);
          break;
        default:
          break;
      }
      return acc;
    }, { bowlerArray: [], battingArray: [], allRounderArray: [], wicketKeeperArray: [] });

    res.status(200).send({
      success: true,
      message: "Get Player Category Successfully",
      bowlerArray,
      battingArray,
      allRounderArray,
      wicketKeeperArray,
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Get Player Category encountered an error",
      error: error.message,
    });
  }
};


const GetPlayerPendingCatagoryController = async(req,res)=>{
  try {
    const getAllPlayerCategory = await playerModel.find({ status: 'pending' });
    const PendingBatsmanCategory = []
    const PendingBowlerCategory = []
    const PendingKeeperCategory = []
    const PendingAllRounderCategory = []

    for (let i = 0; i < getAllPlayerCategory.length; i++) {

      if(getAllPlayerCategory[i].catagory == "Batsman"){
        PendingBatsmanCategory.push(getAllPlayerCategory[i])
      }
      else if(getAllPlayerCategory[i].catagory == "Bowler"){
        PendingBowlerCategory.push(getAllPlayerCategory[i])
      }
      else if(getAllPlayerCategory[i].catagory == "Keeper"){
        PendingKeeperCategory.push(getAllPlayerCategory[i])
      }
      else if(getAllPlayerCategory[i].catagory == "All Rounder"){
        PendingAllRounderCategory.push(getAllPlayerCategory[i])
      }

      
    }

    res.status(200).send({
      success: true,
      message: "Get Pending Player Category Successful",
      PendingBatsmanCategory: PendingBatsmanCategory,
      PendingBowlerCategory:PendingBowlerCategory,
      PendingKeeperCategory:PendingKeeperCategory,
      PendingAllRounderCategory:PendingAllRounderCategory,
    });

    
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Get Player Category encountered an error",
      error: error.message,
    });
  }
}


module.exports = {GetPlayerCatagoryController,GetPlayerPendingCatagoryController}