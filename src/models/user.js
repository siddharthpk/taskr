
const mongoose = require('mongoose')
const validator = require('validator')
const brcypt = require('bcryptjs')


// Created userSchema to use mongoose middleware
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Validation added (In-built)
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){    // Custom validator
            if(value<0){
                throw new Error('Age must be > 0')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('You cannot use "password" as a password')
            }
        }

    }
})

// Did not use ES6 arrow function as we need to bind 'this'
userSchema.pre('save', async function (next){
    var user = this
    if(user.isModified('password')){
        user.password = await brcypt.hash(user.password, 8)
    }
    // console.log('Just before Saving')
    
    next() // Added to show that async function is done running
})

// Create a User model 
const User = mongoose.model('User',userSchema)

module.exports=User