const {validationResult} = require('express-validator')
//const {user} = require('../database/models/index)
const {index,create,write, one} = require('../models/users.model');
const{hashSync}= require("bcryptjs")
const usersController = {
    login: async (req,res) =>{
        return res.render("users/login",{
            title: "Inicia Sesión",
            styles: [
                "main-login",
                "header",
                "footer"
            ]
        })
    },
    processLogin: async (req, res) => {
        let validaciones = validationResult(req)
        let {errors} = validaciones
        if(errors && errors.length > 0){
            return res.render ("users/login",{
                title: "Inicio de Sesión",
                styles:[
                    "main-login",
                    "header",
                    "footer"
                ],
                oldData: req.body,
                errors: validaciones.mapped()
            })
        }
        //let users = await user.findAll()
        let users = index()
        let user = await users.find(u => u.email === req.body.email)
        req.session.user = user
        if(req.body.recordame != undefined){
            res.cookie("recordame", user.email, {maxAge:172800000})
        }
        return res.redirect('/')
    },
    register: async (req,res) =>{
        return res.render("users/register",{
            title: "Registrate",
            styles: [
                "main-forms",
                "header",
                "footer"
            ]
        })
    },
   
    processRegistration: async (req,res) => {
        let validaciones = validationResult(req)
        let {errors} = validaciones
        if(errors && errors.length > 0){
            return res.render ("users/register",{
                title: "Registración",
                styles:[
                    "main-forms",
                    "header",
                    "footer"
                ],
                oldData: req.body,
                errors:validaciones.mapped()
            })
        }
        if (!req.files || req.files.length == 0){
            req.body.image = "default-image.jpg"
        } else{
            req.body.image = req.files[0].filename;
        }
        let newUser = create(req.body)
        let users = index()
        await users.push(newUser)
        // aca tenemos que cambiar el write por .create (creo)
        write(users)
        return res.redirect('/users/login?msg="El registro fue exitoso"')
        
    },
    logout: function (req,res) {
        if(req.cookies.recordame != undefined){
            res.cookie("recordame", {maxAge:0})
        }
        delete req.session.user 
         
        
        return res.redirect('/')
    },
    profile: function(req,res){
        return res.render("users/profile",{
            title: "Perfil de Usuario",
            styles:[
                "profile",
                "header",
                "footer"
            ]
        })
    },
    edit: function(req,res){
        
        return res.render("users/edit", {
            title: "Editar Usuario",
            styles:[
                "main-forms",
                "header",
                "footer"
            ]
        })

    },
    edited: async (req,res) =>{
        let usuario = one(parseInt(req.params.id))
        
        let validaciones = validationResult(req)
        let {errors} = validaciones
        if(errors && errors.length > 0){
            return res.render("users/edit",{
                title: "Editar Perfil",
                styles:[
                    "main-forms",
                    "header",
                    "footer"
                ],
                errors:validaciones.mapped()
            })
        }
        
        if (!req.files || req.files.length == 0){
            avatar = usuario.image
        } else{
            avatar = req.files[0].filename;
        }
        if(!req.body.password || req.body.password.length == 0){
            passw = usuario.password
        }else{
            passw = hashSync(req.body.password,10)
        }
        
        let usuarios = index()
        let usuariosEditados = usuarios.map(u=>{
            if(u.id == usuario.id){
                u.id = usuario.id
                u.name = req.body.name
                u.lastname = req.body.lastname
                u.email = req.body.email
                u.cultivo = req.body.cultivo
                u.password = passw
                u.image = avatar
                u.admin = req.body.email.includes('@gworld.com')
            }
            return u
        })
        //corregir write
        write(usuariosEditados)
        return res.redirect("/users/profile/" + usuario.id)
    }

}

module.exports = usersController