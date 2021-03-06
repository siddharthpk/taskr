const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()


// User SignUp
router.post('/users', async (req,res) =>{
    const user = new User(req.body)
   
    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
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

// Read Users Profile
// Middleware is added as the second arg to add authentication
router.get('/users/me', auth, async (req,res)=>{
    res.send(req.user)
})

/* User Updating */
router.patch('/users/me',auth, async (req,res)=>{
    const toUpdate = Object.keys(req.body)
    const allowUpdate = ['name','eamil','password','age']
    const isValidOp = toUpdate.every((update)=>  allowUpdate.includes(update))

    if (!isValidOp){
        return res.status(400).send({error: 'Invalid updates'})
    }
    
    try{
        toUpdate.forEach((update)=>req.user[update] = req.body[update])

        await req.user.save()

        // Removed the line below as findByIdAndUpdate bypasses middleware
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})

        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

/* User Deleting */
router.delete('/users/me', auth, async(req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router