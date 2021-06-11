require('../db/mongoose')
const Task = require('../models/task')

// Task.findByIdAndDelete('60c2af855d930811bbe15635').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async (id)=>{
    // Note we have not saved this like for the user model, it is because we don't have any use for this as a stored variable
    await Task.findByIdAndDelete(id) 
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('60c3061ad252ad1b7a5984db').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})