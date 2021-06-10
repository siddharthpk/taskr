//Importing all files and modules
const express = require('express')

// DB Connection
require('./db/mongoose')

// DB Models import
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// Accepting json
app.use(express.json())


// Resource creation using POST
app.post('/users',(req,res) =>{
    const user = new User(req.body)

    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

// Task creation using POST
app.post('/tasks', (req,res)=>{
    const task = new Task(req.body)

    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

// Start server listening
app.listen(port, ()=>{
    console.log('Server is running on port ' + port)
})