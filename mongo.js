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

    /*
    Inserting one user
    
    db.collection('users').insertOne({
        name: 'sid',
        age: 23
    }, (error, result) => {
        if(error){
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
    })

    */

    /* Inserting many users
    db.collection('users').insertMany([
        {
            name: 'Rachel',
            age: 28
        },{
            name:  'Ross',
            age: 30
        }

    ], (error,result)=>{
        if(error){
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
    })

    */

    db.collection('tasks').insertMany([
        {
            description: 'Complete Task 1',
            completed: true
        }, 
        {
            description: 'Complete Task 2',
            completed: false
        },
        {
            description: 'Complete Task 3',
            completed: true
        },
    ], (error, result)=>{
        if(error){
            return console.log('Unable to insert task!')
        }

        console.log(result.ops)
    })


})