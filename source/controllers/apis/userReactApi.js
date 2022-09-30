const {usuario} = require("../../database/models/index")

const userReactApi ={
    userCard: async (req,res)=>{
        try{}
        catch (error){
            return res.status(500).json(error)
        }
    },
    userView: async (req,res)=>{
        try{
            let usuarios = await usuario.findAll({include:{all:true}})
            let data = usuarios.map(u=>{
                let user ={
                    id: u.id,
                    nombre: `${u.name} ${u.lastname}`,
                    email:u.email,
                    image:`http://localhost:4422/assets/avatars/${user.image.path}`,
                    cultivo: u.cultivo,
                    detail:`http://localhost:5173/api/users/profile/${u.id}` /*RECONDUCIR AL DE ABAJOact*/ 
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
    findOne: async (req,res) =>{
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