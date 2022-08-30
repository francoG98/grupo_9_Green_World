const {usuario} = require('../database/models/index');

const recordame = async (req,res,next) => {
    if(req.cookies.recordame != undefined && req.session.user == undefined){
        
        let users = await usuario.findAll({include: {all: true}})
        req.session.user = users.find(u => u.email === req.cookies.recordame)
    }
    next()
 }

 module.exports = recordame