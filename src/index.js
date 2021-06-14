//Importing all files and modules
const express = require('express')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
require('./db/mongoose') // --> DO NOT DELETE

// Starting express server
const app = express()
const port = process.env.PORT || 3000

// Accepting json
app.use(express.json())

// User Router
app.use(userRouter)

//Task router
app.use(taskRouter)

// Start server listening
app.listen(port, ()=>{
    console.log('Server is running on port ' + port)
})