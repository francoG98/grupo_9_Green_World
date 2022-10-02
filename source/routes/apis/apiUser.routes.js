const {Router}= require("express")
const router = Router()
const{findLastFiveUsers, findAllUsers, findOneUser} = require("../../controllers/apis/userReactApi")

router.get('/api/lastUsers', findLastFiveUsers)
router.get('/api/users', findAllUsers)
router.get('/api/users/:id', findOneUser)
module.exports= router
