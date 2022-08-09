const multer = require('multer');
const storage = require('../modules/storage');
const userEdit = require("../validaciones/userEdit")
const upload = multer({storage: storage('avatars')});

module.exports = [upload.any(), userEdit]