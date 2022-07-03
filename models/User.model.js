const {Schema,model} = require('mongoose')

const User = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

User.methods.toJSON = function() {
    const {password,__v,_id : uid,...rest} = this.toObject()
    return {uid,...rest}
}

module.exports = model("User",User)