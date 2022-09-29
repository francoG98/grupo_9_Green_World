const {producto}= require("../../database/models/index")

const productApi ={
    findAllProducts: async (req, res)=>{
        try{
            let products = await producto.findAll({include:{all:true}})
            let count = products.length
            let countByCategory = Object({
                parafernalia: 0,
                aditivos: 0,
                medicinal: 0,
                sustratos: 0,
                accesorios: 0
            })
            products.forEach(p=>{
                switch(p.category.name.toLowerCase()){
                    case 'parafernalia': countByCategory.parafernalia += 1;
                    break;
                    case 'aditivos': countByCategory.aditivos += 1;
                    break;
                    case 'medicinal': countByCategory.medicinal += 1;
                    break;
                    case 'sustratos': countByCategory.sustratos += 1;
                    break;
                    case 'accesorios': countByCategory.accesorios += 1;
                    break;
                    default: console.log('Categoría no encontrada')
                }
            })
            products.map(p=>{
                let data = {
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    detail: `localhost:4422/products/detail/${p.id}`
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