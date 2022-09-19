const {usuario}= require("../../database/models/index")
const {compareSync} = require("bcryptjs")

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
    },
    correctEdit: async(req,res)=>{
        try{
            let users = await usuario.findAll({include:{all:true}})
            let user = users.find(user => user.email == req.params.email)
            let pass = user.password
            let success = compareSync(req.params.actualPass, pass)
            return res.send({success}).status(200)
        }catch(error){
            return res.status(500).json(error)
    } 

    }
}
module.exports = userApi