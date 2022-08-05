const {Router}= require("express")
const router = Router()
const {register, login, processRegistration, processLogin, logout} = require("../controllers/user.controller")
const registerMiddleware = require("../middlewares/register")
const loginMiddleware = require("../middlewares/login")
const loggedMiddleware = require('../middlewares/logged')

router.get ("/login", login)
router.get ("/register", register)
router.post("/register", registerMiddleware, processRegistration)
router.post("/login", loginMiddleware, processLogin)
router.get('/logout', loggedMiddleware, logout)

module.exports = router