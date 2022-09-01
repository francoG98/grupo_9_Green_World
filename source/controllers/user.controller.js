const {validationResult} = require('express-validator')
const {usuario, imagene} = require('../database/models/index')
const{hashSync}= require("bcryptjs")
const usersController = { //LISTO
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

    //USAMOS ASYNC PORQUE ES UNA FUNCION ASINCRONA Y POR ESO USAMOS LAS PROMESAS COMO AWAIT 
    processLogin: async (req, res) => { //LISTO
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
        //ACA USAMOS EL AWAIT ANTES DE SOLICITARLE DATOS A SQL, PARA QUE NO SE TRABE LA EJECUCION DE LA APP ESPERANDO A LA BASE DE DATOS
        let users = await usuario.findAll({include:{all:true}})
        let user = users.find(u => u.email === req.body.email)
        //ESTO ES DE LA SESION, NO HAY CAMBIOS
        req.session.user = user
        //LO DE ACA ABAJO SON LAS COOKIES, SIGUE SIN CAMBIOS
        if(req.body.recordame != undefined){
            res.cookie("recordame", user.email, {maxAge:172800000})
        }
        return res.redirect('/')
    },

    //POR MAS QUE NO UTILICEMOS DATOS DE LA BASE DE DATOS EN ESTE METODO, LE DAMOS ASYNC DE TODAS FORMAS.
    register: async (req,res) => {//LISTO
        return res.render("users/register",{
            title: "Registrate",
            styles: [
                "main-forms",
                "header",
                "footer"
            ]
        })
    },
   
    processRegistration: async (req,res) => {//LISTO

        //ESTO ES DE LAS VALIDACIONES, SIGUE IGUAL
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
        //HASHEAMOS LA PASS DEL USER
        req.body.password= hashSync(req.body.password, 10)

        //COMPROBAMOS QUE ES ADMIN
        req.body.isAdmin = String(req.body.email).toLocaleLowerCase().includes('@gworld.com')

        //ALMACENAMOS LA DIRECCION DE LA IMAGEN EN LA BASE DE DATOS
        if (!req.files || req.files.length == 0){
            //ESTE CASO ES EN EL CASO QUE NO HAYA 
            
            req.body.image_id = 6 // EL ID 6 ES DONDE TENEMOS ALMACENADA LA IMAGEN POR DEFECTO DE USUARIOS
        } else {
            let avatar = await imagene.create({
                //SI SE REGISTRA CON UNA IMAGEN AHORA SI LE GUARDAMOS EL PATH EN NUESTRA TABLA DE IMAGENES
                path: req.files[0].filename
            })
            req.body.image_id = avatar.id //Y COLOCAMOS COMO DATO EL ID DE ESA IMAGEN
        }
        await usuario.create(req.body)
        
        return res.redirect('/users/login?msg="El registro fue exitoso"')
        
    },
    logout: async (req,res) => {
        if(req.cookies.recordame != undefined){
            res.cookie("recordame", {maxAge:0})
        }
        delete req.session.user 
        return res.redirect('/')
    },
    profile: async (req,res) => {
        return res.render("users/profile",{
            title: "Perfil de Usuario",
            styles:[
                "profile",
                "header",
                "footer"
            ]
        })
    },
    edit: async (req,res) => {
        
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
        let user = await usuario.findByPk(req.params.id, {include:{all: true}})
        let avatar
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
            avatar = user.image.id
        } else{
            let foto = await imagene.create({
                path:req.files[0].filename
            })
            avatar = foto.id;
        }
        if(!req.body.password || req.body.password.length == 0){
            passw = await user.password
        }else{
            passw = hashSync(req.body.password,10)
        }

        await user.update({
            name:req.body.name,
            lastname:req.body.lastname,
            email:req.body.email,
            cultivo:req.body.cultivo,
            password:req.body.passw,
            image_id:avatar,
            admin:req.body.email.includes('@gworld.com')
        })
        
        //ACA VOLVEMOS A CREAR LA SESION PARA QUE SE ACTUALICEN LOS DATOS
        let users = await usuario.findAll({include:{all:true}})
        let userSession = users.find(u => u.email === req.body.email)
       
        req.session.user = userSession

        
        return res.redirect("/users/profile/" + user.id)
    }

}

module.exports = usersController