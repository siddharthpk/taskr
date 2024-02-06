const request = require('supertest')
const app = require('../src/app')

// Test User SignUp
test('User SignUp should be successful', async ()=>{
    await request(app).post('/users').send({
        name: 'Sid',
        email: 'siddharthpk@icloud.com',
        password: 'RERRFRgrgsrgs#@$'
    }).expect(201)
})