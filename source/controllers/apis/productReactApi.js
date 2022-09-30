const {producto}= require("../../database/models/index")

const productApi ={
    findLastFive: async (req,res)=>{
        try{

        } catch(error){
            return res.status(505).json(error)
        }
    },
    findAllProducts: async (req, res)=>{
        try{
            let products = await producto.findAll({include:{all:true}})
            let count = products.length
            let countByCategory = Object({
                parafernalia: {
                    name: parafernalia,
                    count:0
                },
                aditivos: {
                    name: aditivos,
                    count:0
                },
                medicinal: {
                    name: medicinal,
                    count:0
                },
                sustratos: {
                    name: sustratos,
                    count:0
                },
                accesorios: {
                    name: accesorios,
                    count:0
                }
            })
            products.forEach(p=>{
                switch(p.category.name.toLowerCase()){
                    case 'parafernalia': countByCategory.parafernalia.count += 1;
                    break;
                    case 'aditivos': countByCategory.aditivos.count += 1;
                    break;
                    case 'medicinal': countByCategory.medicinal.count += 1;
                    break;
                    case 'sustratos': countByCategory.sustratos.count += 1;
                    break;
                    case 'accesorios': countByCategory.accesorios.count += 1;
                    break;
                    default: console.log('Categoría no encontrada')
                }
            })
            products.map(p=>{
                let data = {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    category:p.category.name,
                    detail: `http://localhost:4422/products/detail/${p.id}`
                }
                return data
            })
            return res.send({count: count, countByCategory: countByCategory, products: products}).status(200)
        }
        catch(error){
            return res.status(500).json(error)
        }
    },
    findOneProduct: async (req, res)=>{
        try{
            let product = await producto.findByPk(req.params.id,
                {include:{all:true}})
            let data = {
                id: product.id,
                name: product.name,
                description: product.description,
                image:`localhost:4422/assets/products-images/${product.image.path}`,
                category: product.category.name,
                price: product.price
            }
            return res.send({product:data}).status(200)
        }
        catch(error){
            return res.status(500).json(error)
        }
    }
}

module.exports = productApi