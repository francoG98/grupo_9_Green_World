const {Router}= require("express")
const router = Router()
const{findLastFive, findAllProducts, findOneProduct} = require("../../controllers/apis/productReactApi")

router.get('/api/lastProducts', findLastFive)
router.get('/api/products', findAllProducts)
router.get('/api/products/:id', findOneProduct)
