const {usuario} = require("../../database/models/index")

const userReactApi ={
    findLastFiveUsers: async (req,res)=>{
        try{
            let count = await usuario.count()
            let users = await usuario.findAll({
                include:{all:true},
                order:[
                    ["id","DESC"]
                ],
                limit:5
            })
            //DE ESTOS 5 QUEREMOS EL NOMBRE, EL EMAIL Y SI CULTIVA
            users = users.map(u =>{
                let data ={
                    id: u.id,
                    name: `${u.name} ${u.lastname}`,
                    email: u.email,
                    cultivo: u.cultivo
                }
                return data
            })

            //ENVIAMOS COMO RESPUESTA LA CANTIDAD TOTAL DE PRODUCTOS Y LOS ULTIMOS 5 CREADOS
            return res.send({count:count, users:users}).status(200)
        }
        catch (error){
            return res.status(500).json(error)
        }
    },
    findAllUsers: async (req,res)=>{
        try{
            let count = await usuario.count()
             //ACA DEFINIMOS CUANTAS PAGINAS VAMOS A TENER EN TOTAL, PARA DARLE DE PARAMETRO A LOS BOTONES DE PREV/NEXT
             let pages = Math.ceil(count/4)-1
           
             
            

            //ACA DEFINIMOS EL PAGINADO
            let page = 0
            if (req.query && req.query.page){
                page= parseInt(req.query.page)
            }
            let offsetValue = page * 4

            let users = await usuario.findAll(
                {
                    include:{all:true},
                    order:[
                        ["lastname", "ASC"]
                    ],
                    limit:4,
                    offset:offsetValue
                }
            )
            
            users = users.map(u=>{
                let user ={
                    id: u.id,
                    name: `${u.name} ${u.lastname}`,
                    email:u.email,
                    image:`http://localhost:4422/assets/avatars/${u.image.path}`,
                    cultivo: u.cultivo,
                    detail:`http://localhost:5173/api/users/${u.id}` /*RECONDUCIR AL DE ABAJOact*/ 
                }
                return user
            })
            
            //DEVOLVEMOS LA CANTIDAD DE USUARIOS, LAS PAGINAS Y LOS USUARIOS
            
            return res.send({count:count, pages:pages, users:users}).status(200)
        }
        catch(error){
            return res.status(500).json(error)
        }
    },
    findOneUser: async (req,res) =>{
        try{
            let user = await usuario.findByPk(req.params.id,
                {include:{all:true}})
            let data = {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                cultivo: user.cultivo,
                image:`http://localhost:4422/assets/avatars/${user.image.path}`
            }
              
            
            return res.send({user:data}).status(200)
        }
        catch(error){
            return res.status(500).json(error)
        }
    }

}
module.exports= userReactApi