const {body} = require("express-validator")
//const {user} = require('../database/models/index')
const {index}= require ("../models/users.model")
const {compareSync} = require("bcryptjs")
const login = [
    body("email").notEmpty().withMessage("El email no puede quedar vacío").bail().isEmail().withMessage("El formato de email no es válido.").bail().custom(value => {
       //let users = await user.findAl()
        let users = index()
        let user = users.map(u => u.email)
        if(!user.includes(value)){
            throw new Error("El email no está registrado")
        } 
        return true
    }),
    body("password").notEmpty().withMessage("La contraseña no puede quedar vacía").bail().isLength({min:4}).withMessage("La contraseña debe contener al menos cuatro caracteres").bail().custom((value, {req}) => {
        let {email} = req.body
        //let users = await user.findAll()
        let users = index()
        let userDB = users.find(u => u.email === email)
        if(!userDB){
            throw new Error("Usuario no encontrado")
        }
        if(!compareSync(value, userDB.password)){
            throw new Error("La contraseña es incorrecta")
        }
        return true
    })
]

module.exports = login