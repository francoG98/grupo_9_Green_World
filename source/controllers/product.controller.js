const {producto, imagen, categoria} = require("../database/models/index")
const {unlinkSync} = require('fs')
const {join} = require('path')
module.exports = {
     
    categories: async (req,res)=>{ //LISTO

      /*OTRA FORMA:
      let category = await categoria.findAll({
        include:{all:true},
        where:{
          name:{
            [Op.like]: req.params.category
          }
        }
      })
      let products = category.products */ 
      let categoria = req.params.category;
      let products = await producto.findAll({
        include:{all:true},
        where:{
          category:{
            [Op.like]:categoria
          }
        }
      })      
        return res.render("products/categorias",{
          products: products,
          title: categoria.toUpperCase(),
          styles: [
            "main-categories",
            "header",
            "footer"
          ]
        })      
    },
    list: async(req,res)=>{ //LISTO
      let products = await producto.findAll({include:{all:true}})
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
    detail: async(req,res)=>{ //LISTO
      let product = await producto.findByPk(req.params.idProduct, {include:{all:true}})
      if(!product){
      return res.redirect('/products/')
      }
      return res.render("products/productBacklog",{
        title: "Detalle del Producto",
        product: product,
        styles:[
          "product",
          "header",
          "footer"
        ]
      })
    },
   
    create: async(req,res)=>{ //LISTO
      return res.render("products/create",{
        title: "Crear Producto",
        styles: [
          "main-forms",
          "header",
          "footer"
        ]
      })
    },
    created: async (req,res) => {
      
      if(req.files && req.files.length > 0){
        let images = await Promise.all(req.files.map( file =>{
          return imagen.create({
            path:file.filename
          })
        }))
        let nuevoProducto = await producto.create(req.body)
      //req.body.image = req.files[0].filename;
      //let newProduct=create(req.body)     
      //let products = index();
      //products.push(newProduct);      
      //write(products)
      
      return res.redirect('/products/')
  }},
    edit:async(req, res)=>{//LISTO
      let product = await producto.findByPk(req.params.id,{include:{all:true}})
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
    edited: async (req, res)=>{
      let product = await producto.findByPk(req.params.id,{include:{all:true}})
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
    destroy: async (req, res)=>{
      let product = await producto.findByPk(req.params.id,{include:{all:true}})
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
