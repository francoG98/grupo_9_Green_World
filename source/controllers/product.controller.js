const {categorias} = require('../models/products.model')
module.exports = {
    create: (req,res)=>{
        return res.render("products/create",{
          title: "Crear Producto",
          styles: [
            "main-create",
            "header-admin",
        ]
        })
      }
    //categories: (req,res)=>{
     //   let idCategoria = req.params.idCategoria;
  //      categorias.forEach(element=>
  //          {
  //              if(element.name == idCategoria)
    //        })
  //  }
  
  
}
