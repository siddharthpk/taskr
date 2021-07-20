const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) =>{
    try{
        // request headers can be accesed as key-value below
        const token = req.header('Authorization').replace('Bearer ','')
        console.log(token)
        
        // decoded stores the decoded payload for the user after verifying the token
        const decoded = jwt.verify(token, 'thisistheuserstring')

        /* Used findOne and not findById as same user can have multiple tokens
            tokens.token is used to verify that only the logged in session works 
            as after logout token is deleted but stored in the tokens array
        */
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        
        if(!user){
            throw new Error() // Triggers catch 
        }

        // Giving access to route handler to access user instead of wasting resources by multiple access req
        req.user = user
        next()

    }catch(e){
        res.status(401).send({error: 'Authentication Error'})
    }
}

module.exports = auth