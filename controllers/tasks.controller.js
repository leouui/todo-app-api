const TasksCollection = require('../models/TasksCollection.model')

const createTask = async(req,res) => {
    const { userID } = req
    const { desc,title } = req.body
    const userTasks = await TasksCollection.findOne({userID})

    userTasks.tasks = [
        { title, desc },
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
    const { title,desc,completed } = req.body

    const toUpdate = Object.entries({ title,desc,completed }).reduce((pv,cv) =>{
        const [key,value] = cv
        if(value !== undefined) pv[key] = value
        return pv
    },{})

    userTasks.tasks = userTasks.tasks.map((task)=> 
        task._id.toString() === taskID
            ? {
                ...task,
                ...toUpdate
            }
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