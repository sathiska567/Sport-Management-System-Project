

const bcrypt = require('bcrypt');
// const { registerUser } = require('../services/userService');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const PlayerModel = require('../models/playerModel');


// Handle the user Registration
const registerController = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(200).send({
                message: "User Already Exists",
                success: false
            });
        }

        const password = req.body.password;

        // bcrypt the userPassword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        // Generate unique uid
        const lastUser = await User.findOne().sort({ uid: -1 }); // Get the last user based on uid
        let nextUid = 1; // Default to 1 if no users exist

        if (lastUser && !isNaN(lastUser.uid)) {
            nextUid = parseInt(lastUser.uid) + 1;
        }

        // Format uid as at least 3 digits
        const formattedUid = nextUid.toString().padStart(3, '0');

        // Save new details in the database
        const newUser = new User({
            ...req.body,
            uid: formattedUid
        });
        await newUser.save();

        // Handle successful message
        res.status(201).send({
            message: "Registered Successfully",
            success: true,
            user: newUser // Optionally send back the user details
        });

    } catch (error) {
        console.log("Register Controller Error:", error);
        res.status(500).send({
            success: false,
            message: `Register Controller Error: ${error.message}`
        });
    }
};



// Handle the user login
const loginController = async (req, res) => {

    /* try {
       const { username, password } = req.body;

    //   // Check if the admin exists
    //   const user = await User.findOne({ username });

    //   if (!user) {
    //     console.error('wrong username');
    //     return res.status(404).json({ message: 'User not found' });
    //   }

    //   // Compare the provided password with the hashed password in the database
    //   const passwordMatch = await bcrypt.compare(password, user.password);

    //   if (!passwordMatch) {
    //     console.error('wrong password!');
    //     return res.status(401).json({ message: 'Incorrect password' });
    //   }

    //   // Handle successful login (you might want to generate a JWT token here)
    //   res.status(200).json({ message: 'Login successful' });
    // } catch (error) {
    //   console.error('Login error:', error);
    //   res.status(500).json({ message: 'Internal Server Error' });
     } */

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({
                message: "user not found",
                success: false
            });
        }

        // compare the password and hashedpassword
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        // check the passwords are match or not
        if (!isMatch) {
            return res.status(200).send({
                message: "Invalid Email or Password",
                success: false
            });
        }

        // Generate a JWT token after user creation
        const token = jwt.sign({ id: user._id }, 'project21', {
            expiresIn: '1d',
        });

        // handle successfull message
        res.status(200).send({
            message: "Login Success",
            success: true,
            token,
            user

        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }




};

// get current user details
const getCurrentUserController = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.id })
        console.log(user);

        if (!user) {
            res.status(404).send({
                message: "User Cannot find !!",
                success: false
            })
        }

        res.status(200).send({
            message: "Details found",
            success: true,
            user
        })

    } catch (error) {

        res.status(400).send({
            message: "Error occured while login ",
            success: false
        })

    }
}

const applyPositionController = async (req, res) => {
    try {
        console.log(req.body);

        const player = new PlayerModel({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Age: req.body.Age,
            Experience: req.body.Experience,
            Distric: req.body.Distric,
            UserRole: req.body.UserRole,
        });

        await player.save();
        console.log(player);


        // handle notification
        const adminUser = await User.findOne({ isAdmin: true });
        const notification = adminUser.notification;

        notification.push({
            type: "apply-position-request",
            message: "Notification section updated",
            data: {
                RequestedId: player._id,
                name: player.FirstName + " " + player.LastName,
                //  onClickPath: "/admin/docotrs",
            },
        });
        adminUser.save();

        res.status(200).send({
            message: "Player position apply successful",
            success: true,
            player,
        });

    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error (PlayerNo already exists)
            res.status(400).send({
                message: "PlayerNo already exists",
                success: false,
            });
        } else {
            // Other errors
            res.status(400).send({
                message: "Applying position has some error",
                success: false,
                error,
            });
        }
    }
};



module.exports = { registerController, loginController, getCurrentUserController, applyPositionController };
