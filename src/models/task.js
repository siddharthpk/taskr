const mongoose = require('mongoose')
const validator = require('validator')

// Creating a Task model
const Task = mongoose.model('Task',{
    description:{
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    }
})