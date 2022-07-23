const {Router}= require("express")
const {extname, resolve}=require("path")
const router = Router()
const {categories, create, created, detail, list} = require("../controllers/product.controller")
const multer = require('multer');
const storage = require('../modules/storage')
const upload = multer({storage: storage('products-images')});

// requerir el controlador;

router.get("/create", create)
router.get("/categorias/:category", categories)
router.get("/detail/:idProduct", detail)
router.get("/", list)
router.post('/created',[upload.any()],created)

module.exports = router;