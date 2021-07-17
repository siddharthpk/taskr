//Importing all files and modules
const express = require('express')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
require('./db/mongoose') // --> DO NOT DELETE

// Starting express server
const app = express()
const port = process.env.PORT || 3000

// Express Middleware for token authentication step
app.use((req, res, next)=>{
    //console.log(req.method, req.path)
    //next()
    if(req.method === 'GET'){
        res.send('GET requests are disabled')
    }
    else{
        next()
    }
})

// Accepting json
app.use(express.json())

// User Router
app.use(userRouter)

// Task router
app.use(taskRouter)

// Start server listening
app.listen(port, ()=>{
    console.log('Server is running on port ' + port)
})