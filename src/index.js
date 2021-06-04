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


// Resource creation
app.post('/users',(req,res) =>{
    const user = new User(req.body)

    user.save().then(()=>{
        res.send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

// Start server listening
app.listen(port, ()=>{
    console.log('Server is running on port ' + port)
})