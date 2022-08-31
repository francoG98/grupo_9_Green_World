const {producto, imagene, categoria} = require("../database/models/index")
const {unlinkSync} = require('fs')
const sequelize =require("sequelize")
const {Op} = sequelize
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
      let category = req.params.category;
      let products = await producto.findAll({
        include:{all:true},
        where:{
          category:{
            [Op.like]:category
          }
        }
      })      
        return res.render("products/categorias",{
          products: products,
          title: category.toUpperCase(),
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
    created: async (req,res) => { //LISTO
      
      if(req.files && req.files.length > 0){
        let images = await Promise.all(req.files.map( file =>{
          return imagene.create({
            path:file.filename
          })
          
        }))
        req.body.image_id = images.id
      } else {
        req.body.image_id = 8
      }
      await producto.create(req.body)
      return res.redirect('/products/')
    },
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
    edited: async (req, res)=>{ //LISTO
      let product = await producto.findByPk(req.params.id,{include:{all:true}})
      await product.update({
      name :  req.body.name,
      description : req.body.description,
      price : parseInt(req.body.price),
      category_id:req.body.categoria_id,
      color: req.body.color,

      })
          if(req.files && req.files.length > 0){
            unlinkSync(join(__dirname, "../../public/assets/", "products-images",product.image.path))
            let foto = await imagene.create({
              path: req.files[0].filename 
            }) 
            await product.update({
              image_id: foto.id
            })
          }
          return res.redirect("/products/detail/" + product.id)
    },

    destroid: async (req, res)=>{
      let product = await producto.findByPk(req.params.id,{include:{all:true}})
      if(!product){
        return res.redirect("/products/")
      }
      unlinkSync(join(__dirname, "../../public/assets/", "products-images",product.image[0].path))
      await product.destroy()
      return res.redirect('/products/');
    }
  }
