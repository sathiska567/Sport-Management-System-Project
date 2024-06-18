const coachProfileModel = require('../../models/CoachProfileModel/CoachProfileModel');
const coachImageModel = require('../../models/CoachImageModel/CoachImageModel');
const coachCoverImageModel = require('../../models/CoachImageModel/CoachCoverImageModel');
const coachMedicalReportModel = require('../../models/CoachImageModel/CoachMedicalReportModel');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
});


const coachProfileController = async (req, res) => {
        const { coachId, coachName, coachEmail, coachDateOfBirth, coachAge } = req.body;
        console.log(coachId, coachName, coachEmail, coachDateOfBirth, coachAge);
        try {

                const response = new coachProfileModel({
                        coachName: coachName,
                        coachEmail: coachEmail,
                        coachDateOfBirth: coachDateOfBirth,
                        coachAge: coachAge,
                        coachId: coachId,
                })

                await response.save();
               // console.log(response);

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


const coachProfileUploadController = async (req, res) => {
        // console.log(req.files);
        try {
                if (!req.files || !req.files.image) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const result = await cloudinary.uploader.upload(req.files.image.path);

                const data = new coachImageModel({
                        coachId : req.fields.coachId,
                        coachprofileImageSecureLink: result.secure_url,
                        coachprofileImageLink:result.url,

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


const coachCoverImageUploadController = async(req,res)=>{
        try {
                if (!req.files || !req.files.coverImage) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const CoverImageResult = await cloudinary.uploader.upload(req.files.coverImage.path);

                const CoverImageData = new coachCoverImageModel({
                        coachId : req.fields.coachId,
                        coachCoverImageSecureLink: CoverImageResult.secure_url,
                        coachCoverImageLink:CoverImageResult.url,

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


const coachMedicalReportUploadController = async(req,res)=>{
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

                const medicalReportData = new coachMedicalReportModel({
                        coachId : req.fields.coachId,
                        coachmedicalReportSecureLink: medicalReportResult.secure_url,
                        coachMedicalReportLink:medicalReportResult.url,

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



module.exports = { coachProfileController, coachProfileUploadController,coachCoverImageUploadController,coachMedicalReportUploadController}