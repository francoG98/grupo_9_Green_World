const multer = require('multer');
const create = require("../validaciones/productsCreate")
const storage = require('../modules/storage')
const upload = multer({storage: storage('products-images')});

module.exports = [upload.any(), create]