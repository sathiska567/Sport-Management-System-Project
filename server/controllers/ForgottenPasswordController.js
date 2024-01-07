const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const PlayerModel = require('../models/playerModel');


// Forgotten password controller
// Combined endpoint for checking email validity, saving otp, and sending otp
const SendOtpController = async (req, res) => {
        const { email } = req.body;
      
        try {
          // Check if the email exists in the database
          const user = await User.findOne({ email });
          console.log(user);
          
      
          if (user) {
            // Generate a random 4-digit OTP
            const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
            console.log(resetCode);
      
            // Save the reset code in the database
            user.otp = resetCode;
            await user.save();
            console.log('otp saved')
      
            // Send the reset code to the user's email
            await sendEmail(email, resetCode);

        //     const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '2m' });

        //     res.json({ message: 'OTP sent', token, user: { email: user.email, username: user.username } });

            res.status(200).send({
                succuss : true,
                message:"OTP Generate adn Send successfull.please check your email",
                user
            })
      
          } else {
                res.status(400).send({
                        succuss : false,
                        message:"User not Found",
                        
                    })
          }
        } catch (error) {
                res.status(200).send({
                        succuss : false,
                        message:"OTP Generate adn Send Have an error.",
                        error
                    })
        }
      };


const VerifyOtpController = async (req, res) => {
        const { email, otp } = req.body;
        console.log(email, otp);
      
        try {
          // Find the user in the database by email
          const user = await User.findOne({ email });
          console.log(user.username);
      
          if (user && user.otp == otp) {

            // If OTP is correct, you can proceed to reset the password
        //     const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key', { expiresIn: '3m' });
      
            //user.otp = undefined;
            //await user.save();
            //console.log('otp was reset');

        //     res.json({ message: 'OTP verified', token, user: { email: user.email, username: user.username } });

            console.log('OTP verified');

            res.status(200).send({
                succuss:true,
                message:"OTP Verify Successfully.",
                user
            })
      
          } else {
        //     // If OTP is incorrect or user not found, return an error
        //     res.json({ error: 'Invalid OTP' });
        //     console.log('invalid otp');

        res.status(400).send({
                succuss:false,
                message:"OTP Verify Have Error.",                
            })


          }
        } catch (error) {
        //   res.status(500).json({ error: 'Internal server error' });

        res.status(200).send({
                succuss:false,
                message:"Error occure in Forgotten Password Controller",
                error
            })

        }
      };


const ResetPasswordController = async (req, res) => {
//   const {email, newPassword, token} = req.body;

  try {
    // Verify the token
    jwt.verify(token, 'your-secret-key', async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const user = await User.findOne({ email });

      if (user) {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: 'Password changed successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });
  } 
  
  catch(error){
    res.status(400).send({
        succuss:false,
        message:"Error occure in Reset Password Controller",
        error
    })
  }
}

      
module.exports = {SendOtpController,VerifyOtpController,ResetPasswordController};