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


/* Resource creation using POST */

// User Creation
app.post('/users',(req,res) =>{
    const user = new User(req.body)

    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

// Task Creation 
app.post('/tasks', (req,res)=>{
    const task = new Task(req.body)

    task.save().then(()=>{
        res.status(201).send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

/* Resource Reading Using GET */

/* USER Model */
app.get('/users', (req,res)=>{
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
})

// Read user by ID, using express route params
app.get('/users/:id', (req,res)=>{
    const _id = req.params.id

    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })

})

/* TASK Model */

app.get('/tasks', (req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((e)=>{
        res.status(500).send()
    })
})

// Read user by ID, using express route params
app.get('/tasks/:id', (req,res)=>{
    const _id = req.params.id

    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e)=>{
        res.status(500).send()
    })

})


// Start server listening
app.listen(port, ()=>{
    console.log('Server is running on port ' + port)
})