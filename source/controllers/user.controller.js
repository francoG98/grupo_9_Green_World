const {validationResult} = require('express-validator')
const {index,create,write, one} = require('../models/users.model');
const usersController = {
    login: (req,res) =>{
        return res.render("users/login",{
            title: "Inicia Sesión",
            styles: [
                "main-login",
                "header",
                "footer"
            ]
        })
    },
    processLogin: function(req, res){
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
                errors:validaciones.mapped()
            })
        }
        let users = index()
        let user = users.find(u => u.email === req.body.email)
        req.session.user = user
        if(req.body.recordame != undefined){
            res.cookie("recordame", user.email, {maxAge:172800000})
        }
        return res.redirect('/')
    },
    register: (req,res) =>{
        return res.render("users/register",{
            title: "Registrate",
            styles: [
                "main-forms",
                "header",
                "footer"
            ]
        })
    },
   
    processRegistration:function(req,res){
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
        users.push(newUser)
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
    edited:function(req,res){
        let validaciones = validationResult(req)
        let {errors} = validaciones
        if(errors && errors.length > 0){
            return res.render ("users/edit",{
                title: "Editar Perfil",
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
            req.body.image = user.image
        } else{
            req.body.image = req.files[0].filename;
        }
        if(!req.body.password || req.body.password.length == 0){
            req.body.password = user.password
        }
        let usuario = one(parseInt(req.params.id))
        let usuarios = index()
        let usuariosEditados = usuarios.map(u=>{
            if(u.id == usuario.id){
                u.name = req.body.name
                u.lastname = req.body.lastname
                u.email = req.body.email
                u.cultivo = req.body.cultivo
                u.password = hashSync(req.body.password,10)
                u.image = req.body.image
                u.admin = req.body.email.includes('@gworld.com')
            }
            return u
        })
        write(usuariosEditados)
        return res.redirect("/users/profile/" + usuario.id)
    }

}

module.exports = usersController