const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')

const userOne = {
    name: 'Sid',
    email: 'sid@testexample.com',
    password: 'f88rfrfrfrff'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

// Test User SignUp
test('User SignUp should be successful', async ()=>{
    await request(app).post('/users').send({
        name: 'Sid',
        email: 'siddharthpk@icloud.com',
        password: 'RERRFRgrgsrgs#@$'
    }).expect(201)
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})
