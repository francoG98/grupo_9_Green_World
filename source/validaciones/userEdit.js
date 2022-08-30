const {body} = require("express-validator")
const {extname,resolve} = require('path')
const {unlinkSync} = require('fs')
const {compareSync} = require("bcryptjs")
const {Usuario} = require('../database/models/index')

const edit = [
    body("name").notEmpty().withMessage("El nombre no puede quedar vacío.").bail().isLength({min:2}).withMessage("El nombre debe contener al menos dos caracteres").bail(),
    body("lastname").notEmpty().withMessage("El apellido no puede quedar vacío.").bail().isLength({min:2}).withMessage("El apellido debe contener al menos dos caracteres").bail(),
    body("email").notEmpty().withMessage("El email no puede quedar vacío").bail().isEmail().withMessage("El formato de email no es válido.").bail().custom( async (value,{req}) => {
        let usuario = await usuario.findByPk(req.params.id, {include:{all:true}});
        let users = await usuario.findAll({include:{all:true}})    
        
        users = users.map(u => u.email != usuario.email ? u.email : null)
        
        if(users.includes(value)){
            throw new Error("Este email ya está registrado")
        }
        return true
    }).bail(),
    body("avatar").custom( async (value, {req})=>{
        let archivos = req.files
        let extensiones = [".svg", ".jpg", ".png","jpeg"]
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
    }).bail(),
    body("password").custom( async (value) => {
        if(value.length > 0 && value.length < 4 ){
            throw new Error("La contraseña debe tener al menos cuatro caracteres")
        }
        return true
    }).bail(),
    body("passConfirm").custom( async (value,{req}) => {
        let {password} = req.body
        if(password.length > 0 && value !== password){
            throw new Error("Las contraseñas deben coincidir")
            
        }
        
        return true
    }).bail(),
    body("actualPass").notEmpty().withMessage("Para actualizar tus datos debes ingresar tu contraseña actual").bail().isLength({min:4}).withMessage("La contraseña actual contiene al menos cuatro caracteres").bail().custom( async (value, {req}) => {
        let usuario = await usuario.findByPk(req.params.id, {include:{all:true}});
        
        if(!compareSync(value, usuario.password)){
            throw new Error("La contraseña es incorrecta")
        }
        return true

    })

]

module.exports = edit