//const {product} = require('../database/models/index)
const { index,create, write, one} = require('../models/products.model')
const {unlinkSync} = require('fs')
const {join} = require('path')
module.exports = {
     
    categories: (req,res)=>{
      let categoria = req.params.category;
      //let productos = await product.findAll()
      //o tambien puede ser: let productos = await product.findAll({include:{all:true}})
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
    //agregar el async
    list: (req,res)=>{
      //await product.findAll()
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
//agregar el async
    detail: (req,res)=>{
      //let product = await product.findByPk(req.params.idProduct, {include:{all:true}})
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
    },
    //agregar el async
    create: (req,res)=>{
      return res.render("products/create",{
        title: "Crear Producto",
        styles: [
          "main-forms",
          "header",
          "footer"
        ]
      })
    },
    //agregar el async
    created:(req,res)=>{
      req.body.image = req.files[0].filename;
      //await product.create(req.body)
      let newProduct=create(req.body)
      //await product.findAll()
      let products = index();
      products.push(newProduct);
      //¿corregir el write?
      write(products)
      return res.redirect('/products/')
  },
  //agregar el async
    edit:(req, res)=>{
      //corregir el one por findByPk
      let product = one(parseInt(req.params.id))
      if(!product){
        return res.redirect('/products/')
      }
      return res.render('products/edit', {
        title: "Editar el producto",
        product: product,
        styles: [
          "main-forms",
          "header",
          "footer"
        ]
      })
    },
    //agregar el async
    edited:(req, res)=>{
      //corregir por findByPk
      let product = one(parseInt(req.params.id))
      //corregir por findAll (en realidad creo q no vamos a necesitarlo, se borra)
      let products = index()
      //y todo esto lo reemplazamos por:  await productDB.update({
     // name :  req.body.name,
      //description : req.body.description,
      //price : parseInt(req.body.price)
      //})
      let productsEdited = products.map(p=>{
        if(p.id == product.id){
          p.name = req.body.name
          p.description = req.body.description
          p.price = parseInt(req.body.price)
          p.color = req.body.color
      //hasta aca (a chequear igual)
          if(req.files && req.files.length > 0){
            unlinkSync(join(__dirname, "../../public/assets/", "products-images",p.image))
            p.image = req.files[0].filename 
          } else{
            p.image = p.image
          }
        }
        return p
      })
      write(productsEdited)
      return res.redirect("/products/detail/" + product.id)
    },
    //agregar el async
    destroy: (req, res)=>{
      //findByPk
      let product = one(parseInt(req.params.id))
      if(!product){
        return res.redirect("/products/")
      }
      unlinkSync(join(__dirname, "../../public/assets/", "products-images",product.image))
      let products = index()
      //CREO que aca se podria hacer un await product.destroy({where:{
      //id: productDB.id
      //}})
      let productsDeleted = products.filter(p=>p.id !== product.id)
      write(productsDeleted)
      return res.redirect("/products/")
    }
}
