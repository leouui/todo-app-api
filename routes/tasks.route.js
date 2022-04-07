const { Router } = require("express");
const { check } = require("express-validator");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("../controllers/tasks.controller");

const { validate,validateJWT,findTaskByID } = require("../middlewares/");

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
    check("completed",`Send a boolean to the "completed" field`).isBoolean(),
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