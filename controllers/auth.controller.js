const User = require('../models/User.model')
const TasksCollection = require('../models/TasksCollection.model')
const {generateJWT,encryptTxt,compareEncryptTxt} = require('../helpers/')

const loginUser = async(req,res) =>{
    const {email,password : clientPassword = ""} = req.body

    const user = await User.findOne({email,state:true}) || {}
    const {password = `${Date.now().toString(36)}`} = user
    const isValidPassword = compareEncryptTxt(clientPassword,password)

    if (!user || !isValidPassword) {
        return res.status(400).json({
            msg:"Invalid credentials",
            cod:400
        })
    }

    const token = await generateJWT(user._id)

    res.json({
        user,
        token
    })
}

const registerUser = async(req,res) =>{
    const {email,name,password} = req.body

    const user = new User({
        email,
        name,
        password:encryptTxt(password)
    })
    const tasks = new TasksCollection({userID:user._id})

    await tasks.save()
    await user.save()

    const token = await generateJWT(user._id)
    
    res.json({
        user,
        token
    })
}

const checkSession = async(req,res) => {
    const {userID,expiration} = req
    const user = await User.findById(userID)
    
    res.json({
        user,
        expiration:expiration * 1000
    })
}

module.exports = {
    loginUser,
    registerUser,
    checkSession
}