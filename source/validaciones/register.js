const {body} = require("express-validator")
const {index}= require ("../models/users.model")

const register = [
    body("name").notEmpty().withMessage("El nombre no puede quedar vacío.").bail().isLength({min:2}).withMessage("El nombre debe contener al menos dos caracteres").bail(),
    body("lastname").notEmpty().withMessage("El apellido no puede quedar vacío.").bail().isLength({min:2}).withMessage("El apellido debe contener al menos dos caracteres").bail(),
    body("email").notEmpty().withMessage("El email no puede quedar vacío").bail().isEmail().withMessage("El formato de email no es válido.").bail().custom(value =>{
        let users = index()
        users= users.map( u => u.email)
        if(users.includes(value)){
            throw new Error("Este email ya está registrado")
        }
        return true
    }).bail(),
    body("password").notEmpty().withMessage("La contraseña no puede quedar vacía").bail().isLength({min:4}).withMessage("La contraseña debe contener al menos cuatro caracteres").bail(),
    body("passConfirm").custom( (value,{req}) =>{
        let {password} = req.body
        if(value !== password){
            throw new Error("Las contraseñas deben coincidir")
        }
        return true

    })
]
module.exports = register

