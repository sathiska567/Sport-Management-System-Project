const playerProfileModel = require('../../models/PlayerProfileModel/PlayerProfileModel');
const playerImageModel = require('../../models/PlayerImageModel/PlayerImageModel');
const playerCoverImageModel = require('../../models/PlayerImageModel/PlayerCoverImageModel');
const playerMedicalReportModel = require('../../models/PlayerImageModel/PlayerMedicalReportModel');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
});


const playerProfileController = async (req, res) => {
        const { playerId, playerName, playerEmail, playerDateOfBirth, playerAge } = req.body;
        //console.log(playerId, playerName, playerEmail, playerDateOfBirth, playerAge);
        try {

                const profile = await playerProfileModel.findOne({ playerId });
                if (profile) {
                        const response = await playerProfileModel.findOneAndUpdate({ playerId }, { playerName, playerEmail, playerDateOfBirth, playerAge }, { new: true });
                        return res.status(200).send({
                                success: true,
                                message: 'Details Updated successfully',
                                response

                        });
                }

                const response = new playerProfileModel({
                        playerName: playerName,
                        playerEmail: playerEmail,
                        playerDateOfBirth: playerDateOfBirth,
                        playerAge: playerAge,
                        playerId: playerId,
                })

                await response.save();
                //console.log(response);

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


const playerProfileUploadController = async (req, res) => {
        // console.log(req.files);
        try {
                if (!req.files || !req.files.image) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const result = await cloudinary.uploader.upload(req.files.image.path);

                const response = await playerProfileModel.findOne({ playerId: req.fields.playerId });

                if (response) {
                        const data = await playerProfileModel.findOneAndUpdate({ playerId: req.fields.playerId }, { PlayerprofileImageSecureLink: result.secure_url }, { PlayerprofileImageLink: result.url }, { new: true });

                        return res.status(200).send({
                                success: true,
                                message: 'Profile Image updated successfully',
                                data

                        });
                }

                const data = new playerImageModel({
                        playerId: req.fields.playerId,
                        PlayerprofileImageSecureLink: result.secure_url,
                        PlayerprofileImageLink: result.url,

                })

                await data.save();

                // we might want to send a response to the client indicating success
                return res.status(200).send({
                        success: true,
                        message: 'Profile Image uploaded successfully',
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


const playerCoverImageUploadController = async (req, res) => {
        try {
                if (!req.files || !req.files.coverImage) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const CoverImageResult = await cloudinary.uploader.upload(req.files.coverImage.path);

                const data = await playerCoverImageModel.findOne({ playerId: req.fields.playerId })

                if (data) {
                        const CoverImageData = await playerCoverImageModel.findOneAndUpdate({ playerId: req.fields.playerId }, { PlayerCoverImageSecureLink: CoverImageResult.secure_url }, { PlayerCoverImageLink: CoverImageResult.url }, { new: true });

                        return res.status(200).send({
                                success: true,
                                message: 'Cover Image updated successfully',
                                CoverImageData

                        });
                }


                const CoverImageData = new playerCoverImageModel({
                        playerId: req.fields.playerId,
                        PlayerCoverImageSecureLink: CoverImageResult.secure_url,
                        PlayerCoverImageLink: CoverImageResult.url,

                })

                await CoverImageData.save();

                // we might want to send a response to the client indicating success
                return res.status(200).send({
                        success: true,
                        message: 'Cover Image uploaded successfully',
                        CoverImageData

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
}


const playerMedicalReportUploadController = async (req, res) => {
        console.log(req.files);
        try {
                if (!req.files || !req.files.medicalReport) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const medicalReportResult = await cloudinary.uploader.upload(req.files.medicalReport.path);

                console.log(medicalReportResult);

                const medicalReportData = new playerMedicalReportModel({
                        playerId: req.fields.playerId,
                        PlayermedicalReportSecureLink: medicalReportResult.secure_url,
                        PlayerMedicalReportLink: medicalReportResult.url,

                })

                await medicalReportData.save();

                // we might want to send a response to the client indicating success
                return res.status(200).send({
                        success: true,
                        message: 'Medical Report submition successfully',
                        medicalReportData

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
}



module.exports = { playerProfileController, playerProfileUploadController, playerCoverImageUploadController, playerMedicalReportUploadController }