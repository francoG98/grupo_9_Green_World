const {Router}= require("express")
const router = Router()
const{findLastFiveProducts, findAllProducts, findOneProduct, priceCalculator} = require("../../controllers/apis/productReactApi")

router.get('/api/lastProducts', findLastFiveProducts)
router.get('/api/products', findAllProducts)
router.get('/api/products/priceCalculator',priceCalculator)

router.get('/api/products/:id', findOneProduct)



module.exports = router