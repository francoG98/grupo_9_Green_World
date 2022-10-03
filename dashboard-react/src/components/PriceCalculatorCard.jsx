import {useEffect, useState} from 'react'


export default function PriceCalculatorCard(){
    const [products, setProducts] = useState([])
    let [total, setTotal] = useState(0)
    const [productcalc,setProductcalc]= useState([])
    //FALTA TERMINAR

    useEffect(()=>{
        const productApi = async () =>{
            let request = await fetch("http://localhost:4422/api/products/priceCalculator")
            let response = await request.json()   
            setProducts(response) 
            console.log(products)
        }
        productApi()
    },[])

    const priceCalc = e =>{
        e.preventDefault()
        let idBuscado = e.target.elements.id.value
        let cantidad = e.target.elements.qty.value
        let product = products.filter(p=> p.id == idBuscado)
        
        product = product.map(p=>{
            let data = {
                id:p.id,
                name:p.name,
                price:p.price,
                cant:parseInt(cantidad),
                subtotal: parseInt(cantidad * p.price)
            } 
            return data
        })
        setTotal(total+= product[0].subtotal)
        setProducts(products.filter(p=> p.id != idBuscado))
        let joined = productcalc.concat(Object.assign({},product))
        setProductcalc(joined);
    }

    const resetCalc = e =>{
        e.preventDefault()
        setTotal(0)
        setProductcalc([])
        const productApi = async () =>{
            let request = await fetch("http://localhost:4422/api/products/priceCalculator")
            let response = await request.json()   
            setProducts(response) 
        }
        productApi()

    }

    
    return(
        <section className="card">
            <h1>GREEN COST CALCULATOR</h1>
        
            <div className="listaCategorias">
                <p className="txt-pcalc">Seleccionar producto y cantidad</p>
                
            <form className="calcForm" onSubmit={priceCalc}>
                <div className="select">
                <select id="id" name="id" defaultValue="selected">
                    <option value="selected" disabled>Elegí un producto</option>
                    {products.map((p, index) => (
                        <option key={index} value={p.id}>
                            {p.name} - ${p.price}
                        </option>
                    ))}
                </select>
                </div>
                <input type="number" min="1" id="qty" name="qty"></input>
                <button className="btnCalc" type="submit">Agregar</button>
                <button className="btnCalc" onClick={resetCalc} type="reset">Reiniciar Cálculo</button>
            </form>

            <ul>
            {productcalc.length == 0? "":<li className="titles-categorias">
                <p>Cantidad y Producto</p>
                <p>Subtotal</p>
                </li>}
            {productcalc.map((item, index) => (
                <li className={`catLi-${index%2} lista-categorias calcLi`} key={item[0].id}>
                
                    <p>{item[0].cant} - {item[0].name}</p>
                    <p>${item[0].cant * item[0].price}.00</p>
                </li>
                
            ))}
            </ul>
            {productcalc.length == 0? "":<span className="totalCalc">
                <p>Total calculado:</p>
                <h3>${total}.00</h3>
            </span>}
            

            </div>
            

        </section>
    )
}