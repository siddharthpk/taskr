const bcrypt = require('bcryptjs')

const hashFunc = async ()=> {
    var password = 'Teest@2023i232'
    var hashedPass = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPass)

    const isMatch = await bcrypt.compare('teest@2023i232', hashedPass)
    console.log(isMatch)
}

hashFunc()