const EoProfileDetailsNewModel = require('../../models/EoProfileDetailsNewModel/EoProfileDetailsNewModel');
const EoProfileImage = require('../../models/EoProfileImageUploadNewModel/EoProfileImage');
const EoCoverImage = require('../../models/EoProfileImageUploadNewModel/EoCoverImage');
const EoPDF = require('../../models/EoProfileImageUploadNewModel/EoPDF');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
});


const EoProfileController = async (req, res) => {
        const { EoId, EoName, EoEmail, EoDateOfBirth, EoAge } = req.body;
        console.log(EoId, EoName, EoEmail, EoDateOfBirth, EoAge);
        try {

                const response = new EoProfileDetailsNewModel({
                        EoName: EoName,
                        EoEmail: EoEmail,
                        EoDateOfBirth: EoDateOfBirth,
                        EoAge: EoAge,
                        EoId: EoId,
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


const EoProfileUploadController = async (req, res) => {
       
        try {
                if (!req.files || !req.files.image) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const result = await cloudinary.uploader.upload(req.files.image.path);

                const data = new EoProfileImage({
                        EoId : req.fields.EoId,
                        EoprofileImageSecureLink: result.secure_url,
                        EoprofileImageLink:result.url,

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


const EoCoverImageUploadController = async(req,res)=>{
        try {
                if (!req.files || !req.files.coverImage) {
                        return res.status(400).send({
                                success: false,
                                message: 'No image file provided'
                        });
                }

                const CoverImageResult = await cloudinary.uploader.upload(req.files.coverImage.path);

                const CoverImageData = new EoCoverImage({
                        EoId : req.fields.EoId,
                        EoCoverImageSecureLink: CoverImageResult.secure_url,
                        EoCoverImageLink:CoverImageResult.url,

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


const EoReportUploadController = async(req,res)=>{
        console.log("Files:", req.files);
        try {
                if (!req.files || !req.files.Report) {
                        return res.status(400).send({
                                success: false,
                                message: 'No report file provided'
                        });
                }

                const EoReportResult = await cloudinary.uploader.upload(req.files.Report.path);

                console.log("Med Result:", EoReportResult);

                const EoReportData = new EoPDF({
                        EoId : req.fields.EoId,
                        EoReportSecureLink: EoReportResult.secure_url,
                        EoReportLink:EoReportResult.url,

                })

                await EoReportData.save();

                // we might want to send a response to the client indicating success
                return res.status(200).send({
                        success: true,
                        message: ' Report submition successfully',
                        EoReportData

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



module.exports = { EoProfileController, EoProfileUploadController ,EoCoverImageUploadController, EoReportUploadController}