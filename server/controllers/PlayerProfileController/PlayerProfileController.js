const playerProfileModel = require('../../models/PlayerProfileModel.js/PlayerProfileModel');
const playerImageModel = require('../../models/PlayerImageModel/PlayerImageModel');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
});

const playerProfileUploadController = async (req, res) => {
        console.log(req.fields);
        try {
                if (!req.files || !req.files.image) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const result = await cloudinary.uploader.upload(req.files.image.path);

                const data = new playerImageModel({
                        playerId : req.fields.playerId,
                        PlayerprofileImageSecureLink: result.secure_url,
                        PlayerprofileImageLink:result.url,

                })

                await data.save();

                // we might want to send a response to the client indicating success
                return res.status(200).send({
                        success: true,
                        message: 'Image uploaded successfully',
                        data

                });

        } catch (error) {
                console.error(error);

                // Handle the error appropriately and send a relevant response
                return res.status(500).send({
                        success: false,
                        message: 'Internal server error',
                        error
                });
        }
};


const playerProfileController = async (req, res) => {
        const { playerId, playerName, playerEmail, playerDateOfBirth, playerAge } = req.body;
        console.log(playerId, playerName, playerEmail, playerDateOfBirth, playerAge);
        try {

                const response = new playerProfileModel({
                        playerName: playerName,
                        playerEmail: playerEmail,
                        playerDateOfBirth: playerDateOfBirth,
                        playerAge: playerAge,
                        playerId: playerId,
                })

                await response.save();
                console.log(response);

                return res.status(200).send({
                        success: true,
                        message: 'Details uploaded successfully',
                        response

                });

        } catch (error) {
             res.status(400).send({
                        success: false,
                        message: 'Details uploaded Unsuccessfully',
                        error

                });
        }
}


const playerCoverImageUploadController = async(req,res)=>{
   console.log(res.body);
}



module.exports = { playerProfileController, playerProfileUploadController,playerCoverImageUploadController }