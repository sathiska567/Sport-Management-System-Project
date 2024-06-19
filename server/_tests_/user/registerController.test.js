const request = require('supertest');
const app = require('../../index'); // Assuming your Express app is exported from index.js
const User = require('../../models/userModel')


describe('User registration', () => {
    let createdUserId; // Store the ID of the user created during testing


    // Case 01 : New user successfull registration
    test('Successful registration', async () => {
        const userData = {
            email: 'test1@example.com',
            password: '123',
            username: 'l'
        };

        const response = await request(app)
            .post('/api/v1/user/register')
            .send(userData)
            .expect(201);

        // Assert that the response contains the success message
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Registered Successfully');

        // Store the ID of the created user
        createdUserId = response.body.user._id;
    },20000);


    // Case 02 : Register using already existing Email
    test('User already exists', async () => {
        // Assuming there's already a user with the email 'test@example.com' in the database
        const existingUserData = {
            email: 'coach1@gmail.com',
            password: 'password123'
        };

        const response = await request(app)
            .post('/api/v1/user/register')
            .send(existingUserData)
            .expect(200);

        // Assert that the response contains the failure message
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('User Already Exists');
    }, 20000);


    // Deleting the user from DB , created for testing
    afterAll(async () => {
        // Clean up after tests by removing the created user
        if (createdUserId) {
            // Delete the user from the database
            await User.findByIdAndDelete(createdUserId);

            // Check if the user still exists in the database
            const deletedUser = await User.findById(createdUserId);

            // Assert that the deletedUser is null, indicating the user was deleted
            expect(deletedUser).toBeNull();
        }
    }, 20000);

});
