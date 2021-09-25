const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// Task Creation 
router.post('/tasks', auth, async (req,res)=>{
    const task = new Task({
        ...req.body, 
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
    
})

// Read all tasks
router.get('/tasks', auth, async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(500).send()
    }
})

// Read task by ID, using express route params
router.get('/tasks/:id', auth, async (req,res)=>{
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

/* Task Model */
router.patch('/tasks/:id',auth, async (req,res)=>{
    const toUpdate = Object.keys(req.body)
    const allowUpdate = ['description','completed']
    const isValidOp = toUpdate.every((update)=>  allowUpdate.includes(update))

    if (!isValidOp){
        return res.status(400).send({error: 'Invalid updates'})
    }
    
    try{

        const task = await Task.findById(req.params.id)
        
        toUpdate.forEach((update)=>task[update] = req.body[update])

        await task.save()
        
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


/* Task Deleting */
router.delete('/tasks/:id',auth, async(req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router