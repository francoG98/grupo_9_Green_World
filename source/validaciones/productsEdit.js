const {body} = require("express-validator")
const {extname,resolve} = require('path')
const {unlinkSync} = require('fs')
const {compareSync} = require("bcryptjs")
const {Usuario} = require('../database/models/index')

const edit = [
    body("name").notEmpty().withMessage("El nombre no puede quedar vacío.").bail().isLength({min:5}).withMessage("El nombre debe contener al menos dos caracteres").bail(),
    body("description").notEmpty().withMessage("").bail().isLength({min:20}).withMessage("La descripción debe contener al menos 20 caracteres").bail(),
    body("image").custom( async (value, {req})=>{ 
        let archivos = req.files
        let extensiones = [".svg", ".jpg", ".png","jpeg"]
        if (archivos.length != 0){
            
            let image = archivos[0]
            let extension = extname(image.filename)
            if(!extensiones.includes(extension)){
                unlinkSync(resolve(__dirname, '../../public/assets/','products-images',image.filename))
                throw new Error('La imagen no tiene una extensión válida')
            }
            if(image.size > 2097152){
                unlinkSync(resolve(__dirname, '../../public/assets/','products-images',image.filename))
                throw new Error('La imagen supera el peso de 2MB')
            }
        }
        return true
    }).bail(),
    body("price").notEmpty().withMessage("").bail().withMessage('Price not empty')
]

module.exports = edit
