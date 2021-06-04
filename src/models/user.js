
const mongoose = require('mongoose')
const validator = require('validator')

// Create a User model 
const User = mongoose.model('User',{
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

module.exports=User