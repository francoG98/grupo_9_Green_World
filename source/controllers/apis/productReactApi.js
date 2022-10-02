const {producto}= require("../../database/models/index")

const productApi ={
    findLastFiveProducts: async (req,res)=>{
        try{
            let count = await producto.count() //este lo trajimos para sacar la cantidad nomas
            // sacamos la cantidad de productos
            let products = await producto.findAll({//para mostrar los ultimos 5
                include:{
                    all:true
                },
                order:[
                    ["id","DESC"]
                ],
                limit:5
            })
            
            //DE ESTOS 5 QUEREMOS EL NOMBRE, LA CATEGORIA Y EL PRECIO
            products = products.map(p=>{
                let data = {
                    id:p.id,
                    name:p.name,
                    category:p.category.name,
                    price: parseInt(p.price)
                }
                return data
            })
            

            //ENVIAMOS COMO RESPUESTA LA CANTIDAD TOTAL DE PRODUCTOS, Y LOS ULTIMOS 5 AGREGADOS.
            return res.send({count: count, products: products}).status(200)

        } catch(error){
            return res.status(505).json(error)
        }
    },
    findAllProducts: async (req, res)=>{
        try{
            let productos = await producto.findAll({include:{all:true}})
            let count = productos.length
            
            let countByCategory =[
                {
                    name:"parafernalia",
                    id:4,
                    count:0
                },
                {
                    name: "aditivos",
                    id:2,
                    count:0
                },
                {
                    name: "medicinal",
                    id:3,
                    count:0
                },
                {
                    name: "sustratos",
                    id:5,
                    count:0
                },
                {
                    name: "accesorios",
                    id:1,
                    count:0
                }]

            productos.forEach(p=>{ // ACA LLENAMOS CUANTOS HAY POR CATEGORIA
                switch(p.category.name.toLowerCase()){
                    case 'parafernalia': countByCategory[0].count += 1;
                    break;
                    case 'aditivos': countByCategory[1].count += 1;
                    break;
                    case 'medicinal': countByCategory[2].count += 1;
                    break;
                    case 'sustratos': countByCategory[3].count += 1;
                    break;
                    case 'accesorios': countByCategory[4].count += 1;
                    break;
                    default: console.log('Categoría no encontrada')
                }
            })
            
            //ACA DEFINIMOS CUANTAS PAGINAS VAMOS A TENER EN TOTAL, PARA DARLE DE PARAMETRO A LOS BOTONES DE PREV/NEXT
            
            let pages = Math.ceil(count/4) -1
            

            //ACA DEFINIMOS EL PAGINADO
            let page = 0

            if (req.query && req.query.page){
                page= parseInt(req.query.page)
            }
            let offsetValue = page * 4


            //ACA NOS TRAEMOS A 4 PORODUCTOS POR PAGINA ORDENADOS POR ORDEN ALFABETICO
            let products = await producto.findAll(
                {
                    include: {all:true},
                    order:[
                        ["name","ASC"]
                    ],
                    limit:4,
                    offset: offsetValue
                }
            )
            
            //DE ESOS PRODUCTOS DEFINIMOS LOS DATOS QUE VAMOS A PRECISAR PARA LA VISTA
            products = products.map(p=>{
                let data = {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    image:`http://localhost:4422/assets/products-images/${p.image.path}`,
                    category:p.category.name,
                    detail: `http://localhost:4422/products/detail/${p.id}`
                }
                return data
            })
            //ENVIAMOS LA INFORMACION A DONDE SE LLAME A LA API
            //LA CANTIDAD DE PRODUCTOS(COUNT), LAS PAGINAS TOTALES, LA CANTIDAD POR CATEGORIA Y LOS 4 PRODUCTOS DEPENDIENDO EN QUE PAGINA ESTEMOS
            return res.send({count: count,pages:pages, countByCategory: countByCategory, products: products}).status(200)
        }
        catch(error){
            return res.status(500).json(error)
        }
    },
    findOneProduct: async (req, res)=>{
        try{
            //LLAMAMOS Al PRODUCTO COINCIDA CON EL ID QUE VIENE POR PARAMETRO
            let product = await producto.findByPk(req.params.id,
                {include:{all:true}})

            //AL SER UNO SOLO NO HACE FALTA USAR MAP, ASI QUE DEFINIMOS LOS DATOS QUE QUEREMOS EN ESTE DATA.
            let data = {
                id: product.id,
                name: product.name,
                description: product.description,
                image:`http://localhost:4422/assets/products-images/${product.image.path}`,
                category: product.category.name,
                price: product.price
            }

            return res.send({product:data}).status(200)
        }
        catch(error){
            return res.status(500).json(error)
        }
    },
    priceCalculator: async(req,res)=>{
        try{
            let products = await producto.findAll({include:{all:true}})
            
            
            products = products.map(p=>{
                let data = {
                    id:p.id,
                    name:p.name,
                    price:p.price,
                    cant:0,
                    subtotal:0
                }
                return data
            })
            return res.send(products).status(200)

        }
        catch(error){
            return res.status(500).json(error)
        }
    }
}

module.exports = productApi