const {categorias, index} = require('../models/products.model')
module.exports = {
    create: (req,res)=>{
        return res.render("products/create",{
          title: "Crear Producto",
          styles: [
            "main-create",
            "header",
            "footer"
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
      let categoria = req.params.category;
      let productos = index()
      let pertenecen = productos.filter(element=>{
        if (element.category == categoria)
        return element
      })
      if(pertenecen == ""){
        return res.render("home",{
          title: "Green World",
          styles: [
              "main-home",
              "header",
              "footer"
          ],
          categorias: categorias()
      })
      } else {
        return res.render("products/categorias",{
          products: pertenecen,
          title: categoria.toUpperCase(),
          styles: [
            "main-categories",
            "header",
            "footer"
      ]
      })

      }
      
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
          "header",
          "footer"
    ]
    })
    }
  
}
