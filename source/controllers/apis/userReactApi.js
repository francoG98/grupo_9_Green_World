const {usuario} = require("../../database/models/index")

const userReactApi ={
    users: async (req,res)=>{
        try{
            let usuarios = await usuario.findAll({include:{all:true}})
            let data = usuarios.map(u=>{
                let user ={
                    id: u.id,
                    nombre: `${u.name} ${u.lastname}`,
                    email:u.email,
                    detail:`localhost:4422/users/profile/${u.id}` /*Aca no estoy seguro de si habria que hacerlo con el host de react*/ 
                }
                return user
            })
            let count = usuarios.length
            return res.send({count:count, users:data}).status(200)
        }
        catch(error){
            return res.status(500).json(error)
        }
    },
    userUnique: async (req,res) =>{
        try{
            let user = await usuario.findByPk(req.params.id,
                {include:{all:true}})
            let data = {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                cultivo: user.cultivo,
                image:`localhost:4422/assets/avatars/${user.image.path}`
            }
              
            
            return res.send({user:data}).status(200)
        }
        catch(error){
            return res.status(500).json(error)
        }
    }

}
module.exports= userReactApi