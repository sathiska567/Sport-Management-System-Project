const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index'); 
const User = require('../../models/userModel');

describe('Coach Search Controller', () => {
    let createdUserId;

    beforeAll(async () => {
        
            const res = await request(app)
                .post('/api/v1/user/register') 
                .send({
                    username: 'TestCoachSearch',
                    password: 'TestPassword',
                    email: 'testcoach@example.com',
                    isCoach: true,
                })
                .expect(201);
    
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('Registered Successfully');
            expect(res.body.user).toHaveProperty('username', 'TestCoachSearch');
    
            createdUserId = res.body.user._id;
        
    }, 20000);

    afterAll(async () => {
        await User.findByIdAndDelete(createdUserId);
    }, 20000);


    

    test('should search for a coach by name successfully\n coach name : TestCoachSearch', async () => {
        const res = await request(app)
            .post('/api/v1/search/filterCoaches') 
            .send({
                coachName: 'TestCoachSearch'
            })
            .expect(200);

            console.log('searched user : ', res.body.data)

        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Data fetched successfully');
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.data[0]).toHaveProperty('username', 'TestCoachSearch');
    }, 20000);
});
