const {Schema,model} = require('mongoose')
const TaskItem = require('./TaskItem.model')

const TasksCollection = new Schema({
    userID:{
        type:Schema.ObjectId,
        required:true
    },
    tasks:{
        type:[TaskItem],
        default:[]
    }
})

TasksCollection.methods.toJSON = function() {
    const {__v,_id,...rest} = this.toObject()
    return rest
}

module.exports = model("Task",TasksCollection)