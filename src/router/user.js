const express = require('express')
const User = require('../models/user')
const router = new express.Router()

// User Creation
router.post('/users', async (req,res) =>{
    const user = new User(req.body)
   
    try{
        await user.save()
        res.status(201).send(user)
    } catch (e){
        res.status(400).send(e)
    }
    
})

router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch(e){
        res.status(400).send()
  }
})

// Read All Users
router.get('/users', async (req,res)=>{
    try{
        const users = await User.find({})
        res.send(users)
    } catch(e){
        res.status(500).send()
    }
})

// Read user by ID, using express route params
router.get('/users/:id', async (req,res)=>{
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

/* User Updating */
router.patch('/users/:id', async (req,res)=>{
    const toUpdate = Object.keys(req.body)
    const allowUpdate = ['name','eamil','password','age']
    const isValidOp = toUpdate.every((update)=>  allowUpdate.includes(update))

    if (!isValidOp){
        return res.status(400).send({error: 'Invalid updates'})
    }
    
    try{
        const user = await User.findById(req.params.id)
        
        toUpdate.forEach((update)=>user[update] = req.body[update])

        await user.save()

        // Removed the line below as findByIdAndUpdate bypasses middleware
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})

/* User Deleting */
router.delete('/users/:id', async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router