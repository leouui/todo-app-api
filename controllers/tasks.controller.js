const TasksCollection = require('../models/TasksCollection.model')

const createTask = async(req,res) => {
    const { userID } = req
    const { description,title } = req.body
    console.log(userID);
    const userTasks = await TasksCollection.findOne({userID})
    console.log(userTasks);
    userTasks.tasks = [
        { title, description },
        ...userTasks.tasks,
    ]

    await userTasks.save()

    res.json({
        userID,
        task:userTasks.tasks[0]
    })
}

const getTasks = async(req,res) => {
    const { userID } = req
    const { tasks } = await TasksCollection.findOne({userID})

    res.json({
        userID,
        tasks,
    })
}

const updateTask = async(req,res) => {
    const { userTasks,userID } = req
    const { taskID } = req.params
    const { title,description,completed } = req.body

    userTasks.tasks = userTasks.tasks.map((task)=> 
        task._id.toString() === taskID
            ? {...task,title: title || task.title,description,completed}
            : task
    )

    const task = userTasks.tasks.find(({_id}) => _id.toString() === taskID)

    await userTasks.save()

    res.json({
        userID,
        task
    })
}

const deleteTask = async(req,res) => {
    const { userTasks,task,userID } = req
    const { taskID } = req.params

    userTasks.tasks = userTasks.tasks.filter(({_id}) => _id.toString() !== taskID)

    await userTasks.save()

    res.json({
        userID,
        task
    })
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
}