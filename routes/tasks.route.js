const { Router } = require("express");
const { check } = require("express-validator");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("../controllers/tasks.controller");

const { validate,validateJWT,findTaskByID } = require("../middlewares/");

// Pending
// check if the length of the task title is less than 30 characters
// check if the length of the task desc is less than 50 characters

const router = Router()

router.post("/create-task/",[
    validateJWT,
    check("title","You should send a title for this task").not().isEmpty(),
    validate
],createTask)

router.get("/",[
    validateJWT,
],getTasks)

router.put("/:taskID",[
    validateJWT,
    check("taskID","Send a valid id").isMongoId(),
    findTaskByID,
    validate
],updateTask)

router.delete("/:taskID",[
    validateJWT,
    check("taskID","Send a valid id").isMongoId(),
    findTaskByID,
    validate
],deleteTask)

module.exports = router