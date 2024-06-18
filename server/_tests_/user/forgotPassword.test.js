const request = require('supertest')
const app = require('../../index');
const User = require('../../models/userModel');






describe('Forgot Password Reset', () => {

    let createdUserId; // To store the ID of the created user for deletion later


    // Create a new user account for testing
    beforeAll(async () => {
        // Define your test user data
        const userData = {
            username: 'test user',
            email: 'testuserforgot@gmail.com',
            password: 'testpassword'
        };

        // const user = new User({ username: 'coach', email: 'coach@example.com', password: 'password'});
        // await user.save();
        // Make a request to your API to create a new user
        const response = await request(app)
            .post('/api/v1/user/register')
            .send(userData)
            .expect(201); // Assuming 201 is the status code for successful user creation 

        // Store the created user's ID for deletion in the afterAll hook
        createdUserId = response.body.user._id;
    }, 10000);


    // Delete the created user account after all tests are done
    afterAll(async () => {
        if (createdUserId) {
           await User.findByIdAndDelete(createdUserId)
        }
    }, 10000);

    //Case 01 : Valid Email, correct otp, correct password
    describe('\nValid Email, correct otp, correct password', () => {

        let OTP;

        //send otp
        test('OTP sent', async () => {
            const response = await request(app)
                .post('/api/v1/forgotten/forgot-password')
                .send({ email: 'testuserforgot@gmail.com' })
                .expect(200)

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("OTP Generated and Sent successfully. please check your email");

            OTP = response.body.user.otp;
            console.log('22: OTP : ', OTP)

        }, 15000)


        //verify otp
        test('OTP verified', async () => {
            const response = await request(app)
                .post('/api/v1/forgotten/verify-otp')
                .send({ email: 'testuserforgot@gmail.com', otp: OTP })
                .expect(200)

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('OTP Verified Successfully.')
        }, 15000)


        //reset password
        test('new password changed', async () => {
            const response = await request(app)
                .post('/api/v1/forgotten/reset-password')
                .send({ email: 'testuserforgot@gmail.com', password: '123' })
                .expect(200)

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Password changed successfully');
        }, 15000)

        //log in using new password
        test('Successful login using new password', async () => {
            const response = await request(app)
                .post('/api/v1/user/login')
                .send({ email: 'testuserforgot@gmail.com', password: '123' })
                .expect(200);

            // Assert that the response contains the success message and a JWT token
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Login Success');
            expect(response.body.token).toBeDefined();
        }, 15000);
    })



    //Case 02 : Valid Email, wrong otp
    describe('\nValid Email - wrong OTP', () => {

        let OTP;

        //send otp
        test('OTP sent', async () => {
            const response = await request(app)
                .post('/api/v1/forgotten/forgot-password')
                .send({ email: 'testuserforgot@gmail.com' })
                .expect(200)

            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("OTP Generated and Sent successfully. please check your email");

            OTP = 'wrongOtp 0000';

        }, 15000)


        //verify otp
        test('OTP verify - Wrong OTP', async () => {
            const response = await request(app)
                .post('/api/v1/forgotten/verify-otp')
                .send({ email: 'testuserforgot@gmail.com', otp: OTP })
                .expect(200)

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Invalid OTP')
        }, 15000)

    })



    //Case 03 : invalid Email
    describe('\nInvalid Email - OTP send failed', () => {

        //send otp
        test('OTP not sent', async () => {
            const response = await request(app)
                .post('/api/v1/forgotten/forgot-password')
                .send({ email: 'invalidEmailTest@amail.com' })
                .expect(200)

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe("User not Found");

        }, 15000)

    })

})