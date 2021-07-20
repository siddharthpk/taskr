const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()


// User SignUp
router.post('/users', async (req,res) =>{
    const user = new User(req.body)
   
    try{
        await user.save()
        const token = await user.genAuthToken()
        res.status(201).send({user, token})
    } catch (e){
        res.status(400).send(e)
    }
    
})

// User Login
router.post('/users/login', async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        //console.log('WOrks till here!')
        const token = await user.genAuthToken()
        //console.log('WOrks till here too!')
        res.send({user, token})
    } catch(e){
        res.status(400).send()
  }
})

// User Logout
router.post('/users/logout', auth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e){
        res.status(500).send()
    }
})

// All User Session Logout
router.post('/users/logoutAll', auth, async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch(e){
        res.status(500).send()
    }
})

// Read All Users
// Middleware is added as the second arg to add authentication
router.get('/users/me', auth, async (req,res)=>{
    res.send(req.user)
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