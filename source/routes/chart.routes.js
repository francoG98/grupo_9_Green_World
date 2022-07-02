const {Router}= require("express")
const router = Router()
const {chart} = require("../controllers/chart.controller")

router.get ("/chart", chart)
module.exports= router