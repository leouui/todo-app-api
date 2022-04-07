const jwt = require('jsonwebtoken');

const generateJWT = (uid = "") => {
    return new Promise((resolve, reject) => {
        const payload = {uid}

        jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn:"14d"
        },(err,token) => {
            if(err) {
                console.log(err);
                reject(err)
            }

            resolve(token)
        })
    })

}

module.exports = {generateJWT}