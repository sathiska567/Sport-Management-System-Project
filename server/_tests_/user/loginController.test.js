const request = require('supertest');
const app = require('../../index'); // Assuming your Express app is exported from index.js
const User = require('../../models/userModel')





describe('Login Controller', () => {

    let createdUserId; // To store the ID of the created user for deletion later


    // Create a new user account for testing
    beforeAll(async () => {
        // Define your test user data
        const userData = {
            username: 'test user',
            email: 'testuserlogin@gmail.com',
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
    }, 20000);


    // Delete the created user account after all tests are done
    afterAll(async () => {
        if (createdUserId) {
           await User.findByIdAndDelete(createdUserId)
        }
    }, 20000);



    // Test cases for login functionality

    test('Successful login', async () => {
        const userData = {
            email: 'testuserlogin@gmail.com',
            password: 'testpassword'
        };

        const response = await request(app)
            .post('/api/v1/user/login')
            .send(userData)
            .expect(200);

        console.log(response.body)
        // Assert login success
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Login Success');
        expect(response.body.token).toBeDefined();
    }, 20000);

    test('User not found', async () => {
        const userData = {
            email: 'nonexistent@gmail.com',
            password: 'password123'
        };

        const response = await request(app)
            .post('/api/v1/user/login')
            .send(userData)
            .expect(200);

        // Assert user not found
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('user not found');
    }, 20000);

    test('Invalid password', async () => {
        const userData = {
            email: 'testuserlogin@gmail.com',
            password: 'wrongpassword'
        };

        const response = await request(app)
            .post('/api/v1/user/login')
            .send(userData)
            .expect(200);

        // Assert invalid password
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Invalid Email or Password');
    }, 20000);


});
