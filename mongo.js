// CRUD operations

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'taskr'

MongoClient.connect(connectURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client)=>{
    if(error){
        return console.log('Unable to connect to database')
    }

    console.log('Connected Successfully!')
})