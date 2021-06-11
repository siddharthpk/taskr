require('../db/mongoose')
const Task = require('../models/task')

Task.findByIdAndDelete('60c2af855d930811bbe15635').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})