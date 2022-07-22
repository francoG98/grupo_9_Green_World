const {extname} = require('path')
const {diskStorage} = require('multer');
let destination = function (folder){
    return (req, file, callback) => callback(null, folder)
};
let filename= function(req, file, callback ){
       const imageName = "product-" + Date.now() + extname(file.originalname);
       callback(null, imageName)
}
const storage = function(folder){
    return diskStorage({
        destination: destination(folder),
        filename: filename
    });
};
module.exports = storage;