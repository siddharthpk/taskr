
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
        unique: true,
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

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.hash(password,user.password)

    if(!isMatch){
        throw new Error("Unable to login") //Note: don't use a specific error msg such as password not matching as that could lead to a potential security leak.
    }

    return user
}

// Did not use ES6 arrow function as we need to bind 'this'
// Hash the plain text password before saving
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