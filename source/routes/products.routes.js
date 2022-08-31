const {Router}= require("express")
const {extname, resolve}=require("path")
const router = Router()
const {categories, create, created, detail, list, edit, edited, destroid} = require("../controllers/product.controller")
const multer = require('multer');
const storage = require('../modules/storage')
const upload = multer({storage: storage('products-images')});
const loggedMiddleware = require('../middlewares/logged')
const adminMiddleware = require("../middlewares/isAdmin")

// requerir el controlador;

router.get("/create",[adminMiddleware], create)
router.get("/categorias/:category", categories)
router.get("/detail/:idProduct", detail)
router.get("/",[adminMiddleware], list)
router.post('/created',[upload.any()],created)
router.get('/edit/:id',[adminMiddleware], edit)
router.put('/edit/:id', [upload.any()], edited)
router.delete('/delete/:id',[adminMiddleware], destroid)

module.exports = router;