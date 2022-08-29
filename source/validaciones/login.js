const {body} = require("express-validator")
const {Usuario} = require('../database/models/index')
//const {index}= require ("../models/users.model")
const {compareSync} = require("bcryptjs")
const login = [
    body("email").notEmpty().withMessage("El email no puede quedar vacío").bail().isEmail().withMessage("El formato de email no es válido.").bail().custom( async (value) => {
       let users = await usuario.findAll()
        let user = users.map(u => u.email)
        if(!user.includes(value)){
            throw new Error("El email no está registrado")
        } 
        return true
    }),
    body("password").notEmpty().withMessage("La contraseña no puede quedar vacía").bail().isLength({min:4}).withMessage("La contraseña debe contener al menos cuatro caracteres").bail().custom( async (value, {req}) => {
        let {email} = req.body
        let users = await usuario.findAll()
        let user = users.find(u => u.email === email)
        if(!user){
            throw new Error("Usuario no encontrado")
        }
        if(!compareSync(value, user.password)){
            throw new Error("La contraseña es incorrecta")
        }
        return true
    })
]

module.exports = login