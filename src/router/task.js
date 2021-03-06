const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const { json } = require('express/lib/response')
const router = new express.Router()

// POST /tasks Creation 
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

/* 
    GET /tasks?completed
    GET /tasks?limit=5&skip=3 Limits to tasks/pages and allows skipping certain tasks/pages
    GET /task?sortBy=createdAt_asc/desc
    GET /task?sortBy=createdAt:asc/desc
*/
router.get('/tasks', auth, async (req,res)=>{
    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const sortParts = req.query.sortBy.split(':')
        sort[sortParts[0]] = sortParts[1] === 'desc' ? -1 : 1 
    }

    try{
        // const tasks = await Task.find({owner: req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    createdAt: 1 // Asc = 1, Desc = -1
                }
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})

// Read task by ID, using express route params
router.get('/tasks/:id', auth, async (req,res)=>{
    const _id = req.params.id

    try{
        const task = await Task.findOne({_id, owner: req.user._id})
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
        const task = await Task.findOne({
            _id:req.params.id,
            owner:req.user._id
        })
         
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})

        if(!task){
            return res.status(404).send()
        }

        toUpdate.forEach((update)=>task[update] = req.body[update])

        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


/* Task Deleting */
router.delete('/tasks/:id',auth, async(req,res)=>{
    try{
        const task = await Task.findOneAndDelete({
            _id:req.params.id, 
            owner: req.user._id
        })

        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router