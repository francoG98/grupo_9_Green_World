const {categoria} = require('../database/models/index')
module.exports = {
    home: async(req,res) =>{

        let categorias = await categoria.findAll({include:{all:true}})
        return res.render("home",{
            title: "Green World",
            styles: [
                "main-home",
                "header",
                "footer"
            ],
            categorias: categorias
        })
    }
}
    