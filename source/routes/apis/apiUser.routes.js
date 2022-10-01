const {Router}= require("express")
const router = Router()
const{userCard, userView, findOne} = require("../../controllers/apis/userReactApi")

router.get('/api/lastUsers', userCard)
router.get('/api/users', userView)
router.get('/api/users/:id', findOne)

