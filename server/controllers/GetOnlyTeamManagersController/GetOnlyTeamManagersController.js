const User = require("../../models/userModel")

const GetOnlyTeamManagersController = async(req,res)=>{
        try {
                const data = await User.find({});
                const teamManager = []
          
                const dataLength = data.length;
          
                for (let i = 0; i < dataLength; i++) {
                  if(data[i].isTeamManager){
                    teamManager.push(data[i])
                  }
                  
                }
          
                // console.log(dataLength);
          
                res.status(200).send({
                  success:true,
                  message:"Data fetched successfully",
                  data:teamManager,
               })
          
             } catch (error) {
                  res.status(400).send({
                     success:false,
                     message:error.message,
                  })
             }
}


// paginations
const GetOnlyTMPaginationController = async (req, res) => {
  try {
    const { page } = req.body;
    const data = await User.find({ isTeamManager: true });

    // Default to page 1 if not provided or invalid
    const pageNumber = parseInt(page, 10) || 1;

    // Define the limit per page
    const limit =5;

    // Calculate the skip based on pageNumber and limit
    const skip = (pageNumber - 1) * limit;

    // Get the coaches for the current page
    const paginatedCoaches = data.slice(skip, skip + limit);

    // Total number of coaches
    const totalTM = data.length;

    res.status(200).send({
      success: true,
      message: "Data fetched successfully",
      data: {
        limit,
        TM: paginatedCoaches,
        totalTM,
        totalPages: Math.ceil(totalTM / limit),
        currentPage: pageNumber,
      },
    });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {GetOnlyTeamManagersController,GetOnlyTMPaginationController};