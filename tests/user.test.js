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
        email: 'sidpk@test.com',
        password: 'RERRFRgrgsrgs#@$'
    }).expect(201)
})

// Existing User Login
test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

// Non-existent User Login
test('Should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: '51f45rf5rf'
    }).expect(400)
})