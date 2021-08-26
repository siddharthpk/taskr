const mongoose = require('mongoose')

//Connect to DB 
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    userFindAndModify: false
})

