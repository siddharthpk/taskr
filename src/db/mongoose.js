const mongoose = require('mongoose')

//Connect to DB 
mongoose.connect('mongodb://127.0.0.1:27017/taskr-api'),{
    useNewUrlParser: true,
    useCreateIndex: true,
    userFindAndModify: false
}

