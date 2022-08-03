const {Router}= require("express")
const router = Router()
const {register, login, processRegistration} = require("../controllers/user.controller")
const registerValidation = require("../validaciones/register")

router.get ("/login", login)
router.get ("/register", register)
router.post("/register",[registerValidation], processRegistration)

module.exports= router