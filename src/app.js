//Importing all files and modules
const express = require('express')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
require('./db/mongoose') // --> DO NOT DELETE

// Starting express server
const app = express()

// Accepting json
app.use(express.json())

// User Router
app.use(userRouter)

// Task router
app.use(taskRouter)

module.exports = app