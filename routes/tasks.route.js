const { Router } = require("express");
const { check } = require("express-validator");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require("../controllers/tasks.controller");

const { validate,validateJWT,findTasksByID } = require("../middlewares/");

const router = Router()

const taskValidation = [
    check("title","You should send a title for this task")
        .not().isEmpty(),
    check("title","The title should be string")
        .isString(),
    check("title","The title's length should be less than 35 characters")
        .isLength({max:35}),
    check("desc","The desc should be string")
        .isString(),
    check("desc","The desc's length should be less than 55 characters")
        .isLength({max:55}),
    check("completed","Completed should be Boolean")
        .not().isBoolean(),
]

router.post("/create-task/",[
    ...taskValidation,
    validate,
    validateJWT
],createTask)

router.get("/",[
    validateJWT,
],getTasks)

router.put("/:taskID",[
    check("taskID","Send a valid id").isMongoId(),
    check(["title","desc","completed"]).optional(true),
    ...taskValidation,
    validate,
    validateJWT,
    findTasksByID,
],updateTask)

router.delete("/:taskID",[
    check("taskID","Send a valid id").isMongoId(),
    validate,
    validateJWT,
    findTasksByID,
],deleteTask)

module.exports = router