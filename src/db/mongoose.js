const mongoose = require('mongoose')

//Connect to DB 
mongoose.connect('mongodb://127.0.0.1:27017/taskr-api'),{
    useNewUrlParser: true,
    useCreateIndex: true
}

// Create a User model 
const User = mongoose.model('User',{
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// Using the model above to perform operations on DB, returns a validation error if wrong type

const me = new User({
    name: 'Sid',
    age: 23
})

// Saving the data, returns a promise
me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log('Error', error)
})