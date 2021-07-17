const jwt = require('jsonwebtoken')

const jwtFunc = async ()=> {
    var token = jwt.sign({_id: 'abc123' },'thisisthesecretstring', {expiresIn: '180 seconds'})

    console.log(token)

    const data = jwt.verify(token, 'thisisthesecretstring')
    console.log(data)
    
}

jwtFunc()