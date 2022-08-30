const {resolve} = require("path")
const {readFileSync} = require("fs");
const {Usuario} = require('../database/models/index');

const recordame = async (req,res,next) => {
    if(req.cookies.recordame != undefined && req.session.user == undefined){
        let file = resolve(__dirname,'../data','users.json')
        let data = readFileSync(file, {encoding: "utf-8"});
        let users = await usuario.findAll({include: {all: true}})
        req.session.user = users.find(u => u.email === req.cookies.recordame)
    }
    next()
 }

 module.exports = recordame