//Importing all files and modules
const app = require('./app')
const port = process.env.PORT

// Start server listening
app.listen(port, ()=>{
    console.log('Server is running on port ' + port)
})