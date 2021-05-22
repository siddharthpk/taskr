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

// Initiating a connection to MongoDB
MongoClient.connect(connectURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client)=>{
    if(error){
        return console.log('Unable to connect to database')
    }

    //console.log('Connected Successfully!')
    // Choosing DB to perfrom insert op
    const db = client.db(databaseName)

    /* ****** CREATE ******** */
    /*
    Inserting one user
    */
    const insert1 = () =>{
        db.collection('users').insertOne(
            {
            _id: id,
            name: 'Dale',
            age: 25
             }, (error, result) => {
            if(error){
                return console.log('Unable to insert user')
            }

            console.log(result.ops)
         })
    }

    /*
    Inserting many  user
    */ 
   const InsertMany = () =>{
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
   }

   /* ****** READ ******** */

   //FindOne returns first matching document by default
   const FindOne = () => {
            db.collection('users').findOne({
            name: 'sid',
            _id: new ObjectID("60a4cafee95b9870a3202c42") // For searaching by id remember to convert to string as it is binary by default
        }, (error,user)=>{
                if(error){
                    return console.log('Unable to fetch')
                }

                console.log(user)
        })
            // Reading last task in tasks collection
            db.collection('tasks').findOne({
            _id: new ObjectID("60a6084691f71f174d814328")
        }, (error,user)=>{
            if(error){
                return console.log('Unable to find!')
            }

            console.log(user)
            })
    }

   //Find creates a cursor that can be used to iterate over the results,
   const FindMany = () => {
       //toArray is a cursor
        db.collection('users').find({
            age: 23
        }).toArray((error,users)=>{
            console.log(users)
        })

        //count is a cursor 
        db.collection('users').find({
            age: 23
        }).count((error,users)=>{
            console.log(users)
        })
        
        //Reading all incomplete tasks
        db.collection('tasks').find({
            completed: false
        }).toArray((error,users)=>{
            console.log(users)
        })
   }

   /* ****** UPDATE using Promises ******** */
   const UpdateDB_One = db.collection('users').updateOne({
            _id: new ObjectID("60a4cafee95b9870a3202c42")
        },{
            $set:{
                name: 'Sid'
            },
            $inc: {
                age: 1
            }
        }).then((result)=>{
            console.log(result)
        }).catch((error)=>{
            console.log(error)
    })

}) 