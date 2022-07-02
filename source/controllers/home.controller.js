const {categorias} = require('../models/products.model')
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
        },
        
        )
    }
}
    