const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const {sendWelcomeEmail, sendCancellationEmail} = require('../emails/account')
const router = new express.Router()



// User SignUp
router.post('/users', async (req,res) =>{
    const user = new User(req.body)
   
    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name) // Sends Welcome Email
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
        const token = await user.genAuthToken()
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
        sendCancellationEmail(req.user.email, req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

// Configuring multer
const upload = multer({
    // Validation for avatar upload
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    } 
})

/* User Avatar File Upload */ 
// Middleware uses upload.single() to register and error handling added, auth added before upload starts
router.post('/users/me/avatar', auth, upload.single('avatar'),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer() // Image resize, type formatting
    req.user.avatar = buffer // To save the image
    await req.user.save()
    res.send()
},(error, req, res, next)=>{
    res.status(400).send({error: error.message})
})

/* User Avatar Delete*/
router.delete('/users/me/avatar', auth, async(req,res)=>{
    req.user.avatar = undefined // To delete/clear the image
    await req.user.save()
    res.send()
})

/* Get User Avatar */
router.get('/users/:id/avatar', async(req,res) => {
    try {
        const user = await User.findById(req.params.id)
        
        // If no user or no user avatar
        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type','iamge/png')  // Set header type to png image
        res.send(user.avatar)

   } catch (e) {
        res.status(404).send()
    }
})


module.exports = router