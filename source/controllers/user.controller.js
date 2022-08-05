const {validationResult} = require('express-validator')
const {index,create,write} = require('../models/users.model');
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
        } else{
            let newUser = create(req.body)
            let users = index()
            users.push(newUser)
            write(users)
            return res.redirect('/users/login?msg="El registro fue exitoso"')
        }
    },
    logout: function (req,res) {
        delete req.session.user 
        return res.redirect('/')
      }
}

module.exports = usersController