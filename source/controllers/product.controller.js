const { index,create, write, one} = require('../models/products.model')
module.exports = {
     
    categories: (req,res)=>{
      let categoria = req.params.category;
      let productos = index()
      let pertenecen = productos.filter(element=>{
        if (element.category == categoria)
        return element
      })
        return res.render("products/categorias",{
          products: pertenecen,
          title: categoria.toUpperCase(),
          styles: [
            "main-categories",
            "header",
            "footer"
          ]
        })      
    },
    list: (req,res)=>{
      let products = index();
      if(req.query && req.query.name){
        products = products.filter(product=> product.name.toLowerCase().indexOf(req.query.name.toLowerCase())> -1)
      }
      return res.render("products/list",{
        title: "Listado de Productos",
        products: products,
        styles: [
          "main-list",
          "header",
          "footer"
        ]
      })
    },

    detail: (req,res)=>{
      let product = one(parseInt(req.params.idProduct))
      if(!product){
      return res.redirect('/products/')
      }
      res.render("products/productBacklog",{
        title: "Detalle del Producto",
        product: product,
        styles:[
          "product",
          "header",
          "footer"
        ]
      })

      //if(!product){
      //return res.redirect('/products/')
      //}
      //return res.render('products/productBacklog', {
      //    title: 'Detalle del Producto',
      //    product:product,
      //    styles: [
      //      "product",
      //      "header",
      //      "footer"
      //    ]
      //})
    },
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
    created:(req,res)=>{
      req.body.image = req.files[0].filename;
      let newProduct=create(req.body)
      let products = index();
      products.push(newProduct);
      write(products)
      return res.redirect('/products/')
  }
}
