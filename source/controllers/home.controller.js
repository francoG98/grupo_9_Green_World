//const {home} = require('../database/models/index)
const {categorias} = require('../models/categorias.model')
module.exports = {
    home: (req,res) =>{
        return res.render("home",{
            title: "Green World",
            styles: [
                "main-home",
                "header",
                "footer"
            ],
            categorias: categorias()
        })
    }
}
    