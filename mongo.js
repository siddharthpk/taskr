// CRUD operations

// Importing required modules
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

// Connect Url and db name
const connectURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'taskr'

// Initiating a connection to MongoDB
MongoClient.connect(connectURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client)=>{
    if(error){
        return console.log('Unable to connect to database')
    }

    //console.log('Connected Successfully!')
    // Choosing DB to perfrom insert op
    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: 'sid',
        age: 23
    })
})