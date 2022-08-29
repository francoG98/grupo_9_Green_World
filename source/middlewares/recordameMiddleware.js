const {resolve} = require("path")
const {readFileSync} = require("fs");
// ¿cambiar function por async?
function recordame(req,res,next){
    if(req.cookies.recordame != undefined && req.session.user == undefined){
        let file = resolve(__dirname,'../data','users.json')
        let data = readFileSync(file, {encoding: "utf-8"});
        // ¿let users = await user.findAll()?
        let users = JSON.parse(data);
        req.session.user = users.find(u => u.email === req.cookies.recordame)
    }
    next()
 }

 module.exports = recordame