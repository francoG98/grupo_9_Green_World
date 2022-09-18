const {usuario}= require("../../database/models/index")
const {Op} = require("sequelize")

const userApi = {
    userExists: async (req,res)=>{
        try{
            let users = await usuario.findAll({
                include:{
                    all:true
                }
            })
            let exists = users.map(user => user.email).includes(req.params.email)
            return res.send({exists}).status(200)
        } catch (error){
            return res.status(500).json(error)
        }
    }
}
module.exports = userApi