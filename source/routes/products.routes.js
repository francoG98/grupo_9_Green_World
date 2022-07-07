const {Router}= require("express")
const router = Router()
const {categories, create, oneProduct, list} = require("../controllers/product.controller")
// requerir el controlador;

router.get("/create", create)
router.get("/categorias", categories)
router.get("/productBacklog", oneProduct)
router.get("/list", list)

module.exports = router;