const nodemailer = require('nodemailer');
require("dotenv").config(); // Load environment variables


// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM, // Replace with your Gmail email
    pass: process.env.EMAIL_PASSWORD, // Replace with your Gmail email password
  },
});

// Function to send an email
const sendEmail = async (email, resetCode) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is: ${resetCode}`,
      };
      console.log("email service started");

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } 

  catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Failed to send email');
  }
};

module.exports = { sendEmail };