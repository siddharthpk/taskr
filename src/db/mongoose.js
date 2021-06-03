const mongoose = require('mongoose')
const validator = require('validator')

//Connect to DB 
mongoose.connect('mongodb://127.0.0.1:27017/taskr-api'),{
    useNewUrlParser: true,
    useCreateIndex: true
}

/************* Users Model *************/

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
            if(value.toLowerCase.includes('password')){
                throw new Error('You cannot use "password" as a password')
            }
        }

    }
})

// Using the model above to perform operations on DB, returns a validation error if wrong type

const me = new User({
    name: '    Timmy',
    age: 24,
    email:'  email@domain.com',
    password: 'passw'
    

})

// Saving the data, returns a promise
me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log('Error', error)
})

// /************* Task Model *************/

// Creating a Task model
const Task = mongoose.model('Task',{
    description:{
        type: String
    },
    completed:{
        type: Boolean
    }
})

// Adding a new task
const task = new Task({
    description: 'Adding first doc',
    completed: false
})

// Saving the task
task.save().then(()=>{
    console.log(task)
}).catch((error)=>[
    console.log(error)
])

