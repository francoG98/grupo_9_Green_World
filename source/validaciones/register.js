const {body} = require("express-validator")
const {extname,resolve} = require('path')
const {unlinkSync} = require('fs')
const {usuario} = require('../database/models/index')

const register = [
    body("name").notEmpty().withMessage("El nombre no puede quedar vacío.").bail().isLength({min:2}).withMessage("El nombre debe contener al menos dos caracteres").bail(),
    body("lastname").notEmpty().withMessage("El apellido no puede quedar vacío.").bail().isLength({min:2}).withMessage("El apellido debe contener al menos dos caracteres").bail(),
    body("email").notEmpty().withMessage("El email no puede quedar vacío").bail().isEmail().withMessage("El formato de email no es válido.").bail().custom( async (value) => {
        let users = await usuario.findAll({include:{all:true}})
        users= users.map( u => u.email)
        if(users.includes(value)){
            throw new Error("Este email ya está registrado")
        }
        return true
    }).bail(),
    body("password").notEmpty().withMessage("La contraseña no puede quedar vacía").bail().isLength({min:8}).withMessage("La contraseña debe contener al menos ocho caracteres").bail(),
    body("passConfirm").custom( async (value,{req}) => {
        let {password} = req.body
        if(value !== password){
            throw new Error("Las contraseñas deben coincidir")
        }
        return true

    }).bail(),
    body("avatar").custom( async (value, {req})=>{
        let archivos = req.files
        let extensiones = [".svg", ".jpg", ".png",".jpeg", ".gif", ".jfif"]
        if (archivos.length != 0){
            
            let avatar = archivos[0]
            let extension = extname(avatar.filename)
            if(!extensiones.includes(extension)){
                unlinkSync(resolve(__dirname, '../../public/assets/','avatars',avatar.filename))
                throw new Error('La imagen no tiene una extensión válida')
            }
            if(avatar.size > 2097152){
                unlinkSync(resolve(__dirname, '../../public/assets/','avatars',avatar.filename))
                throw new Error('La imagen supera el peso de 2MB')
            }
        }
        return true
    })
]
module.exports = register

