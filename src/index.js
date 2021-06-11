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
app.post('/users', async (req,res) =>{
    const user = new User(req.body)
   
    try{
        await user.save()
        res.status(201).send(user)
    } catch (e){
        res.status(400).send(e)
    }
    
})

// Task Creation 
app.post('/tasks', async (req,res)=>{
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

/* Resource Reading Using GET */

/* USER Model */

// All Users
app.get('/users', async (req,res)=>{
    try{
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send()
    }
})

// Read user by ID, using express route params
app.get('/users/:id', async (req,res)=>{
    const _id = req.params.id

    try{
        const user = await User.findById(_id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e){
        res.status(500).send()
    }
})

/* TASK Model */

// Read all tasks
app.get('/tasks', async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
})

// Read task by ID, using express route params
app.get('/tasks/:id', async (req,res)=>{
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})


// Start server listening
app.listen(port, ()=>{
    console.log('Server is running on port ' + port)
})