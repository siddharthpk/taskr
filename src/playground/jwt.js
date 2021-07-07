const jwt = require('jsonwebtoken')

const jwtFunc = async ()=> {
    var token = jwt.sign({_id: 'abc123' },'thisisthesecretstring')

    console.log(token)
    
}

jwtFunc()