const {Router}= require("express")
const router = Router()
const {register, login, processRegistration, processLogin} = require("../controllers/user.controller")
const registerMiddleware = require("../middlewares/register")
const loginMiddleware = require("../middlewares/login")

router.get ("/login", login)
router.get ("/register", register)
router.post("/register", registerMiddleware, processRegistration)
router.post("/login", loginMiddleware, processLogin)

module.exports = router