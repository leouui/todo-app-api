const jwt = require('jsonwebtoken')

const validateJWT = (req,res,next) => {
    const token = req.headers["x-token"]
    console.log(token);
    try {
        const {uid,exp} = jwt.verify(token,process.env.SECRET_KEY,)
        console.log(uid,exp);
        
        req.userID = uid
        req.expiration = exp

        next()
    } catch (error) {
        res.status(401).json({
            msg:"Invalid token",
            cod:401
        })
    }
}

module.exports = {validateJWT}