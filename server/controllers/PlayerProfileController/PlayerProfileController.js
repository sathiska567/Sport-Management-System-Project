const playerProfileModel = require('../../models/PlayerProfileModel.js/PlayerProfileModel');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
});

const playerProfileUploadController = async (req, res) => {
        try {
                if (!req.files || !req.files.image) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const result = await cloudinary.uploader.upload(req.files.image.path);
                console.log(result);

                // we might want to send a response to the client indicating success
                return res.status(200).send({
                        success: true,
                        message: 'Image uploaded successfully',
                        result

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
        console.log(req.files);
        // try {

        //         if (!req.files || !req.files.image) {
        //                 return res.status(400).send({
        //                         success: false,
        //                         message: 'No image file provided'
        //                 });
        //         }

        //         const result = await cloudinary.uploader.upload(req.files.image.path);
        //         console.log(result);

        //         const response = new playerProfileModel({
        //                 playerName: playerName,
        //                 playerEmail: playerEmail,
        //                 playerDateOfBirth: playerDateOfBirth,
        //                 playerAge: playerAge,
        //                 playerId: playerId,
        //                 PlayerprofileImageSecureLink:result.secure_url,
        //         })

        //         await response.save();
        //         console.log(response);

        // } catch (error) {
        //         console.log(error);
        // }
}



module.exports = { playerProfileController, playerProfileUploadController }