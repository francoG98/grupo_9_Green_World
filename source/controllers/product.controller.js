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
      },
    //categories: (req,res)=>{
     //   let idCategoria = req.params.idCategoria;
  //      categorias.forEach(element=>
  //          {
  //              if(element.name == idCategoria)
    //        })
  //  }
  
    categories: (req,res)=>{
      return res.render("products/categorias",{
        title: "Categorias",
        styles: [
          "main-categories",
          "header",
          "footer"
    ]
    })
    },

    oneProduct: (req,res)=>{
      return res.render("products/productBacklog",{
        title: "Detalle del Producto",
        styles: [
          "product",
          "header",
          "footer"
    ]
    })
    },

    list: (req,res)=>{
      return res.render("products/list",{
        title: "Listado de Productos",
        styles: [
          "main-list",
          "header-admin",
          "footer"
    ]
    })
    }
  
}
