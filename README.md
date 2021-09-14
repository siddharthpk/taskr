# Taskr
 
This repo hosts the code for a Task App that uses a REST API to allow users to perform operations to a MongoDB database in the backend.  

# Before Deployment

## Dependencies

- Run `npm install` to install all required dependencies.

- Create a config directory under the root directory
    `dev.env` file for the dev server and add the private API_KEYS 
    `test.env` file for the test server and add the private API_KEYS 

    Note: Remember to add these files to `gitignore`

- Run `npm run dev` to start the dev server

- Run `npm run test` to start the test server
    
- Run `npm start` to start the prod server 

- Visit `localhost:3000` in a browser window to access the REST API

## Database

- Locally, you can start your MongoDB instance by executing `/Path/To/MongoDB/bin/mongod --dbpath=/Path/To/DB/Data/Location`

- At times, you may forget to stop the db instance and try this command resulting in an exit code: 48 {Shutting Down}. 
    For this execute `ps aux | grep -v grep | grep mongod `
    And then take the PID from the result and execute `kill -9 PID`
    Re-execute the line in the previous statment and start your db instance

# API Endpoints

## User Model

### Login User

### Signup User
 
### Logout User

### Update User

## Task Model

# API Testing ( Screenshots included )

TODO

# Concepts learned:

- MongoDB and Mongoose
- Promises
- REST API
- Promise Chaining
- Async/Await
- Authentication using JWT 
- Middleware
- API Testing with Postman
- Postman Env Set-up & Auth Set-up
- Software Testing with Jest
- Pagination/Sorting
  

# Deployment

The app will be deployed to Heroku Dyno offered under GitHub Dev Pack.

Give it about 15 seconds to load.


