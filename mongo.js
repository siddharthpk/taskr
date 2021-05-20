// CRUD operations

/*
Importing required modules
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
*/

//Using shorthand to import fucntions from mongodb module
const {MongoClient, ObjectID} = require('mongodb')

// Connect Url and db name
const connectURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'taskr'

const id = new ObjectID()
console.log(id.id.length)
console.log(id.getTimestamp())  //Getting the time stamp stored in the first 4 bytes of the ObjectID
console.log(id.toHexString().length) //Getting a 24byte hex respresentation of ObjectID

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
        _id: id,
        name: 'Dale',
        age: 25
    }, (error, result) => {
        if(error){
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
    })
    

    /*
    Inserting many  user
    
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
    */


})