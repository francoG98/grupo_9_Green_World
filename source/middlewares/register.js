const multer = require('multer');
const storage = require('../modules/storage');
const register = require("../validaciones/register")
const upload = multer({storage: storage('avatars')});

module.exports = [upload.any(), register]