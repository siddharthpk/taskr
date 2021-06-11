require('../db/mongoose')
const User = require('./../models/user')

User.findByIdAndUpdate('60c184719740833369d183ff', {age: 0}).then((user)=>{
    console.log(user)
    return User.countDocuments({age: 0})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})