//Importing all files and modules
const express = require('express')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')
require('./db/mongoose') // --> DO NOT DELETE

// Starting express server
const app = express()
const port = process.env.PORT || 3000

// Express Middleware for token authentication step
// app.use((req, res, next)=>{
//     //console.log(req.method, req.path)
//     //next()
//     res.status(503).send('Under Maintenance')
// })

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

/*
const Task = require('./models/task')
const User = require('./models/user')

const main = async () =>{
    const task = await Task.findById('614ecf563c4570873647749a')
    await task.populate('owner').execPopulate() // populate finds the associated user with the owner id
    //console.log(task.owner)

    const  user = await User.findById('614eceaa94008c86686d7f84')
    await user.populate('tasks').execPopulate()
    //console.log(user.tasks)
}   

main()
*/