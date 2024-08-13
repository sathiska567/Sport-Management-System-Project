const RefreeProfileDetailsNewModel = require('../../models/RefreeProfileDetailsModel/RefreeProfileDetailsModel');
const RefreeProfileImage = require('../../models/RefreeUploadingModel/RefreeProfileImageModel');
const RefreeCoverImage = require('../../models/RefreeUploadingModel/RefreeCoverImageModel');
const RefreePDF = require('../../models/RefreeUploadingModel/RefreePdfModel');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
});


const RefreeProfileController = async (req, res) => {
        const { RefreeId, RefreeName, RefreeEmail, RefreeDateOfBirth, RefreeAge } = req.body;
        //console.log(RefreeId, RefreeName, RefreeEmail, RefreeDateOfBirth, RefreeAge);
        try {

                const response = new RefreeProfileDetailsNewModel({
                        RefreeId: RefreeId,
                        RefreeName: RefreeName,
                        RefreeEmail: RefreeEmail,
                        RefreeDateOfBirth: RefreeDateOfBirth,
                        RefreeAge: RefreeAge,
                       
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


const RefreeProfileUploadController = async (req, res) => {
       
        try {
                if (!req.files || !req.files.image) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const result = await cloudinary.uploader.upload(req.files.image.path);

                const data = new RefreeProfileImage({
                        RefreeId : req.fields.RefreeId,
                        RefreeprofileImageSecureLink: result.secure_url,
                        RefreeprofileImageLink:result.url,

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


const RefreeCoverImageUploadController = async(req,res)=>{
        try {
                if (!req.files || !req.files.coverImage) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const CoverImageResult = await cloudinary.uploader.upload(req.files.coverImage.path);

                const CoverImageData = new RefreeCoverImage({
                        RefreeId : req.fields.RefreeId,
                        RefreeCoverImageSecureLink: CoverImageResult.secure_url,
                        RefreeCoverImageLink:CoverImageResult.url,

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


const RefreeReportUploadController = async(req,res)=>{
        console.log("Files:", req.files);
        try {
                if (!req.files || !req.files.Report) {
                        return res.status(400).send({
                                success: false,
                                message: 'No report file provided'
                        });
                }

                const RefreeReportResult = await cloudinary.uploader.upload(req.files.Report.path);

                console.log("Med Result:", RefreeReportResult);

                const RefreeReportData = new RefreePDF({
                        RefreeId : req.fields.RefreeId,
                        RefreeReportSecureLink: RefreeReportResult.secure_url,
                        RefreeReportLink:RefreeReportResult.url,

                })

                await RefreeReportData.save();

                // we might want to send a response to the client indicating success
                return res.status(200).send({
                        success: true,
                        message: ' Report submition successfully',
                        RefreeReportData

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



module.exports = { RefreeProfileController,RefreeProfileUploadController,RefreeCoverImageUploadController,RefreeReportUploadController}