const {Router}= require("express")
const router = Router()
const {categories, create, created, detail, list, edit, edited, destroid} = require("../controllers/product.controller")
const createMiddleware = require("../middlewares/createProduct")
const editMiddleware = require("../middlewares/editProduct")
const loggedMiddleware = require('../middlewares/logged')
const adminMiddleware = require("../middlewares/isAdmin")

// requerir el controlador;

router.get("/create",[adminMiddleware], create)
router.get("/categorias/:category", categories)
router.get("/detail/:idProduct", detail)
router.get("/",[adminMiddleware], list)
router.post('/created',createMiddleware,created)
router.get('/edit/:id',[adminMiddleware], edit)
router.put('/edit/:id', editMiddleware, edited)
router.delete('/delete/:id',[adminMiddleware], destroid)

module.exports = router;