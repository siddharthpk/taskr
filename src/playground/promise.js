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

const updateAgeAndCount = async (id, age)=>{
    const user = await User.findByIdAndUpdate(id, {age}) //Shorthand for age as we want default values
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('60c184719740833369d183ff', 23).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})