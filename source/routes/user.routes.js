const {Router}= require("express")
const router = Router()
const {register, login} = require("../controllers/user.controller")

router.get ("/login", login)
router.get ("/register", register)

module.exports= router