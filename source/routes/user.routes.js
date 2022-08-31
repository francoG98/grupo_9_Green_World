const {Router}= require("express")
const router = Router()
const {register, login, processRegistration, processLogin, logout, profile, edit, edited} = require("../controllers/user.controller")
const registerMiddleware = require("../middlewares/register")
const loginMiddleware = require("../middlewares/login")
const loggedMiddleware = require('../middlewares/logged')
const reverseLogged = require("../middlewares/reverseLogged")// lo que hace es que si estas logueado, no te deje acceder a determinadas paginas, te lleva al home
const editMiddleware = require("../middlewares/userEdit")


router.get ("/login",reverseLogged, login)
router.get ("/register",reverseLogged, register)
router.post("/register", registerMiddleware, processRegistration)
router.post("/login", loginMiddleware, processLogin)
router.get('/logout', [loggedMiddleware], logout)
router.get("/profile/:id",[loggedMiddleware], profile)
router.get("/edit/:id",[loggedMiddleware], edit)
//router.post("/edit/:id",editMiddleware, edited)

module.exports = router