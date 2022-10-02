const {Router}= require("express")
const router = Router()
const{findLastFiveProducts, findAllProducts, findOneProduct} = require("../../controllers/apis/productReactApi")

router.get('/api/lastProducts', findLastFiveProducts)
router.get('/api/products', findAllProducts)
router.get('/api/products/:id', findOneProduct)
