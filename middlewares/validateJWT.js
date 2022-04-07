const jwt = require('jsonwebtoken')

const validateJWT = (req,res,next) => {
    const token = req.headers["x-token"]

    try {
        const {uid,exp} = jwt.verify(token,process.env.SECRET_KEY,)
        
        req.userID = uid
        req.expiration = exp

        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:"Invalid token",
            cod:401
        })
    }
}

module.exports = {validateJWT}