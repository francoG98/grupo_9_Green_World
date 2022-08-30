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
          req.body.image = images.id
        }))
        await producto.create(req.body)
      
      return res.redirect('/products/')
  }},
    edit: async (req, res) => {//LISTO
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
      await product.update({
      name :  req.body.name,
      description : req.body.description,
      price : parseInt(req.body.price)
      })
          if(req.files && req.files.length > 0){
            unlinkSync(join(__dirname, "../../public/assets/", "products-images",product.image.path))
            let foto = await imagen.create({
              path: req.files[0].filename 
            }) 
            await product.update({
              image_id: foto.id
            })
          }
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
