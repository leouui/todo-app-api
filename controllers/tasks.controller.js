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
    const { title,desc,completed } = req.body
    const { taskID } = req.params
    let task = {}

    // an object is created with the props of the req.boy that contain values
    const toUpdate = Object.entries({ title,desc,completed }).reduce((pv,cv) =>{
        const [key,value] = cv
        if(value !== undefined) return {...pv,[key]:value}
        return pv
    },{})
    // of all task, the one to be updated is searched by its ID and is added the object "toUpdate"
    userTasks.tasks = userTasks.tasks.map((t)=>{
        if(String(t._id) === taskID){
            task = { ...t, ...toUpdate }
            return task
        }
        return t
    })

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