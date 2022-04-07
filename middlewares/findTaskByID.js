const TasksCollection = require("../models/TasksCollection.model")

const findTaskByID = async(req,res,next) => {
    const { userID } = req
    const { taskID } = req.params
    const userTasks = await TasksCollection.findOne({userID})
    const task = userTasks.tasks.find(({_id}) => _id.toString() === taskID)

    if(!task) return res.status(400).json({
        msg:"There are not any tasks with the given ID",
        cod:400
    })
    
    req.userTasks = userTasks
    req.task = task

    next()
}

module.exports = {
    findTaskByID
}