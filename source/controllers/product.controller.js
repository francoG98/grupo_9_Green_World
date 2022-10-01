
const {producto, imagene} = require("../database/models/index")
const {validationResult} = require('express-validator')
const {validationResult} = require('express-validator')
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
      let value 
      if(req.params.category == "accesorios"){
        value = 1
      }else if(req.params.category == "aditivos"){
        value = 2
      }else if(req.params.category == "medicinal"){
        value = 3
      }else if(req.params.category == "parafernalia"){
        value = 4
      }else if(req.params.category == "sustratos"){
        value = 5
      }
      let category = req.params.category;
      let products = await producto.findAll({
        include:{all:true},
        where:{
          category_id:{
            [Op.eq]:value
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
      
      let validaciones = validationResult(req)
      let {errors} = validaciones
      if(errors && errors.length > 0){
          return res.render ("products/create",{
              title: "Crear Producto",
              styles:[
                  "main-forms",
                  "header",
                  "footer"
              ],
              oldData: req.body,
              errors:validaciones.mapped()
          })
      }


      if(!req.files || req.files.length == 0){
        req.body.image_id = 8
      } else{
        let imagenProduct = await imagene.create({
          path: req.files[0].filename
        })
        req.body.image_id = imagenProduct.id
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
      let validaciones = validationResult(req)
      let {errors} = validaciones
      if(errors && errors.length > 0){
          return res.render ("products/edit",{
              title: "Editar el Producto",
              styles:[
                  "main-forms",
                  "header",
                  "footer"
              ],
              product:product,
              oldData: req.body,
              errors:validaciones.mapped()
          })
      }
     
      await product.update({
      name :  req.body.name,
      description : req.body.description,
      price : parseInt(req.body.price),
      category_id:req.body.categoria_id,
      color: req.body.color,

      })
          if(req.files && req.files.length > 0){
            await unlinkSync(join(__dirname, "../../public/assets/", "products-images",product.image.path))
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
      let imageProd = await imagene.findByPk(product.image.id)
      await unlinkSync(join(__dirname, "../../public/assets/", "products-images",product.image.path))
      await product.destroy()
      await imageProd.destroy()
      return res.redirect('/products/');
    }

    
  }
