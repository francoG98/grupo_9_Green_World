const {Router}= require("express")
const router = Router()
const {home} = require("../controllers/home.controller")

router.get ("/", home)
module.exports= router