const {Router}= require("express")
const router = Router()
const {categories, create} = require("../controllers/product.controller")
// requerir el controlador;

router.get("/create", create)

module.exports = router;