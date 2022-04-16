const { Router } = require("express");
const { check } = require("express-validator");
const {
    loginUser,
    registerUser,
    checkSession
} = require("../controllers/auth.controller")

const { validate,validateJWT } = require("../middlewares/")
const { doesPropinSchema } = require("../DB/db-validators")

const User = require("../models/User.model");

const router = Router()

router.get("/check",[
    validateJWT
],checkSession)

router.post("/login",[
    check("email","Send a valid email").isEmail(),
    validate
],loginUser)

router.post("/register",[
    check("email","Send a valid email").isEmail(),
    check("email").custom(doesPropinSchema(User,"email","The email is already in use")),
    check("password","Your password must be at least 6 characters long").isLength({min:6}),
    check("name","Send a name").not().isEmpty(),
    validate
],registerUser)

module.exports = router