const eventOrganizerProfileModel = require('../../models/EventOrganizerProfileModel/EventOrganizerProfileModel');
const eventOrganizerImageModel = require('../../models/EventOrganizerImageModel/EventOrganizerImageModel');
const eventOrganizerCoverImageModel = require('../../models/EventOrganizerImageModel/EventOrganizerCoverImageModel');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
});


const eventOrganizerProfileController = async (req, res) => {
        const { eventOrganizerId, eventOrganizerName, eventOrganizerEmail, eventOrganizerDateOfBirth, eventOrganizerAge } = req.body;
        console.log(eventOrganizerId, eventOrganizerName, eventOrganizerEmail, eventOrganizerDateOfBirth, eventOrganizerAge);
        try {

                const response = new eventOrganizerProfileModel({
                        eventOrganizerName: eventOrganizerName,
                        eventOrganizerEmail: eventOrganizerEmail,
                        eventOrganizerDateOfBirth: eventOrganizerDateOfBirth,
                        eventOrganizerAge: eventOrganizerAge,
                        eventOrganizerId: eventOrganizerId,
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


const eventOrganizerProfileUploadController = async (req, res) => {
        console.log(req.fields.eventOrganizerId);
        try {
                if (!req.files || !req.files.image) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const result = await cloudinary.uploader.upload(req.files.image.path);

                const data = new eventOrganizerImageModel({
                        eventOrganizerId : req.fields.eventOrganizerId,
                        eventOrganizerprofileImageSecureLink: result.secure_url,
                        eventOrganizerprofileImageLink:result.url,

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


const eventOrganizerCoverImageUploadController = async(req,res)=>{
        try {
                if (!req.files || !req.files.coverImage) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const CoverImageResult = await cloudinary.uploader.upload(req.files.coverImage.path);

                const CoverImageData = new eventOrganizerCoverImageModel({
                        eventOrganizerId : req.fields.eventOrganizerId,
                        eventOrganizerCoverImageSecureLink: CoverImageResult.secure_url,
                        eventOrganizerCoverImageLink:CoverImageResult.url,

                })

                await CoverImageData.save();

                // we might want to send a response to the client indicating success
                return res.status(200).send({
                        success: true,
                        message: 'Image uploaded successfully',
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



module.exports = { eventOrganizerProfileController, eventOrganizerProfileUploadController,eventOrganizerCoverImageUploadController}