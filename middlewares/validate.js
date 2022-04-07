const { validationResult } = require("express-validator");

const validate = (req,res,next) => {
    const {errors:[error]} = validationResult(req)

    if(error) {
        return res.status(400).json({
            msg:error.msg,
            cod:400
        })
    }
    next()
}

module.exports = {validate}