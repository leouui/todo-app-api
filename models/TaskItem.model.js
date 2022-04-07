const {Schema} = require('mongoose')

const TaskItem = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    completed:{
        type:Boolean,
        default:false
    }
})

TaskItem.methods.toJSON = function() {
    const {__v,_id : uid,...rest} = this.toObject()

    return {...rest,uid}
}

module.exports = TaskItem