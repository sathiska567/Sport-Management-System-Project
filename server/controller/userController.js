const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const playerModel = require("../models/playerModel")

//register callback
const registerController = async (req, res) => {
        try {
                const exisitingUser = await userModel.findOne({ email: req.body.email });
                if (exisitingUser) {
                        return res.status(200).send({
                                message: "User Already Exist",
                                success: false
                        });
                }

                const password = req.body.password;

                const salt = await bcrypt.genSalt(10);

                const hashedPassword = await bcrypt.hash(password, salt);
                req.body.password = hashedPassword;

                const newUser = new userModel(req.body);
                await newUser.save();

                res.status(201).send({
                        message: "Register Sucessfully",
                        success: true,

                });

        } catch (error) {
                console.log(error);
                res.status(500).send({
                        success: false,
                        message: `Register Controller ${error.message}`,
                });
        }
};

// login Controller
const loginController = async (req, res) => {
        try {
                const user = await userModel.findOne({ email: req.body.email });

                if (!user) {
                        return res.status(200).send({
                                message: "user not found",
                                success: false
                        });
                }
                // compare the password and hashedpassword
                const isMatch = await bcrypt.compare(req.body.password, user.password);

                if (!isMatch) {
                        return res.status(200).send({
                                message: "Invlid Email or Password",
                                success: false
                        });
                }


                // Generate a JWT token after user creation
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                        expiresIn: '1d',
                });

                res.status(200).send({
                        message: "Login Success",
                        success: true,
                        token

                });

        } catch (error) {
                console.log(error);
                res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
        }
};


// get current user
const currentUserController = async (req, res) => {

        try {

                const user = await userModel.findOne({ _id: req.body.id })

                if (!user) {

                        return res.status(200).send({
                                message: "user not found",
                                success: false,
                        })

                } else {
                        res.status(200).send({
                                success: true,
                                data: user,
                        });
                }


        } catch (error) {

                console.log(error);
                return res.status(400).send({
                        success: false,
                        message: "Current user controller have error",
                        error
                })


        }

}


// get all Users controller
const authController = async (req, res) => {
        try {
                const user = await userModel.findOne({ _id: req.body.id });
                // user.password = undefined;


                // const user = await userModel.find({})

                console.log(user);

                if (!user) {
                        return res.status(200).send({
                                message: "users not found",
                                success: false,
                        });
                } else {
                        res.status(200).send({
                                success: true,
                                data: user,
                        });
                }
        } catch (error) {
                console.log(error);
                res.status(500).send({
                        message: "auth error",
                        success: false,
                        error,
                });
        }
};



const applyController = async (req, res) => {
        try {

                const newPlayer = await playerModel(req.body);

                await newDoctor.save();

                const adminUser = await userModel.findOne({ isAdmin: true });
                const notification = adminUser.notification;
                notification.push({
                        type: "apply-position-request",
                        message: "position apply",
                        
                });

                await userModel.findByIdAndUpdate(adminUser._id, { notification });

                res.status(201).send({

                        success: true,
                        message: 'Position account applied successfully',
                        newDoctor

                });

        } catch (error) {
                res.status(500).send({
                        success: false,
                        message: 'Error while applying position',
                });
        }


}


const allUserController = async (req, res) => {

        try {

                const users = await userModel.find({});

                if (!users) {

                        res.status(404).send({
                                success: false,
                                message: "Users Not found",

                        })

                }
                res.status(200).send({
                        success: true,
                        message: "All user found",
                        users
                })


        } catch (error) {
                res.status(200).send({
                        success: true,
                        message: "Error inside the get all user controller",
                        users
                })
        }


}


const getAllNotificationController = async (req, res) => {

        try {

                const user = await userModel.findOne({ _id: req.body.id })
                const seennotification = user.seennotification
                const notification = user.notification
                seennotification.push(...notification)

                user.notification = []
                user.seennotification = notification

                const updatedUser = await user.save()

                res.status(200).send({
                        message: "All notification marked as read",
                        success: true,
                        data: updatedUser
                })


        } catch (error) {

                console.log("Error found in getAllNotificationController");
                res.status(400).send({
                        success: false,
                        message: "Error in notification",
                        error
                })

        }

}



module.exports = { loginController, registerController, authController, applyController, currentUserController, allUserController, getAllNotificationController };