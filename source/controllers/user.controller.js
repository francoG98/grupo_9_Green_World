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
    }
}

module.exports = usersController